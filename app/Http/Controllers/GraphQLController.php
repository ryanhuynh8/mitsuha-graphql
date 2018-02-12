<?php namespace App\Http\Controllers;

use GraphQL\Utils\BuildSchema;
use GraphQL\Utils\AST;
use GraphQL\GraphQL;
use App\Issue;

interface Resolver {
    public function resolve($root, $args, $context);
}

class IssueResolver implements Resolver
{
    public function resolve($root, $args, $context)
    {
        $offset = $args['offset'];
        $limit = $args['limit'];
        $issues = Issue::where('status', 0)->limit($limit)->skip($offset)->get();
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

    public function index() {
        try {
            $time_start = microtime(true);
            $contents = file_get_contents(__DIR__.'\..\..\..\schema\schema.graphql');
            $schema = BuildSchema::build($contents);
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = isset($input['variables']) ? $input['variables'] : null;

            $time_end = microtime(true);
            $time = $time_end - $time_start;

            $rootValue = [
                'issues' => function($root, $args, $context) {
                    $resolver = new IssueResolver();
                    return $resolver->resolve($root, $args, $context);
                },
                'issue' => function($root, $args, $context) {
                    $resolver = new SingleIssueResolver();
                    return $resolver->resolve($root, $args, $context);
                }
            ];


            if (strpos($query, 'query IntrospectionQuery {') !== false) { // black magic
                $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues, null, null);
            } else {
                $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues);
            }
            $output = $result->toArray();
        } catch (\Exception $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage()
                ]
            ];
        }

        return $output;
    }
}
