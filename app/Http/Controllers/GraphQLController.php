<?php
namespace App\Http\Controllers;

use GraphQL\Utils\BuildSchema;
use GraphQL\Utils\AST;
use GraphQL\GraphQL;
use App\Issue;
use App\Permission;
use App;
use App\GraphQL\Resolver;
use App\GraphQL\Mutator;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use GraphQL\Error\Debug;

class IssueResolver implements Resolver
{
    public function resolve($root, $args, $context)
    {
        $offset = $args['offset'];
        $limit = $args['limit'];
        $projectId = $args['projectId'];
        $issues = Issue::where('project_id', $projectId)->limit($limit)->skip($offset)->get();
        return $issues;
    }
}

class SingleIssueResolver implements Resolver
{
    public function resolve($root, $args, $context)
    {
        $id = $args['id'];
        $issue = Issue::where('id', $id)->get()->first();
        return $issue;
    }
}

class CommentsMutator implements Mutator
{
    public function mutate($root, $args, $context)
    {
        $time_start = microtime(true);
        $userId = JWTAuth::getPayload(JWTAuth::getToken())->get('sub')['id'];
        $id = $args['issueId'];
        $commentText = $args['commentText'];
        $issue = Issue::findOrFail($id);
        $permission = Permission::where('project_id', $issue->project_id)->get()->first();

        if (!$permission) {
            return 'PERMISSION_DENIED';
        }

        $comment = new App\Comment();
        $comment->issue_id = $id;
        $comment->user_id = $userId;
        $comment->comment = $commentText;
        $comment->save();
        $time_end = microtime(true);
        $time = $time_end - $time_start;
        return 'SUCCESS';
    }
}

class GraphQLController extends Controller {
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function generate() {
//        for ($i = 1; $i <= 100; $i++) {
//            $json = json_decode(file_get_contents('http://www.randomtext.me/api/gibberish/p-6/20-35'), true);
//            $issue = new Issue();
//            $issue->description = $json['text_out'];
//            $issue->title = 'Foobar '.$i;
//            $issue->save();
//        }
        echo 'Success';
    }

    public function index(Request $request) {
        try {
            $time_start = microtime(true);
            $contents = file_get_contents(__DIR__.'\..\..\..\schema\schema.graphql');
            $schema = BuildSchema::build($contents);
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = isset($input['variables']) ? $input['variables'] : null;


            $rootValue = [
                'issues' => function($root, $args, $context) {
                    $resolver = new IssueResolver();
                    return $resolver->resolve($root, $args, $context);
                },
                'issue' => function($root, $args, $context) {
                    $resolver = new SingleIssueResolver();
                    return $resolver->resolve($root, $args, $context);
                },
                'comments' => function($root, $args, $context) {
                    $resolver = new App\GraphQL\CommentsResolver();
                    return $resolver->resolve($root, $args, $context);
                },
                'addComment' => function($root, $args, $context) {
                    $mutator = new CommentsMutator();
                    return $mutator->mutate($root, $args, $context);
                }
            ];

            $debug = Debug::INCLUDE_DEBUG_MESSAGE | Debug::INCLUDE_TRACE;

            if (strpos($query, 'query IntrospectionQuery {') !== false) { // black magic
                $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues, null, null);
            } else {
                $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues);
            }

            $output = $result->toArray($debug);
        } catch (\Exception $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage()
                ]
            ];
        }
        $time_end = microtime(true);
        $time = $time_end - $time_start;
        return $output;
    }
}
