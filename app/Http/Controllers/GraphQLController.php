<?php namespace App\Http\Controllers;

use GraphQL\Utils\BuildSchema;
use GraphQL\Utils\AST;
use GraphQL\GraphQL;
use App\Issue;

interface Resolver {
    public function resolve($root, $args, $context);
}

class Addition implements Resolver
{
    public function resolve($root, $args, $context)
    {
        $issues = Issue::all();
        return $issues;
    }
}

class GraphQLController extends Controller {
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
            $contents = file_get_contents(__DIR__.'\..\..\..\schema\schema.graphql');
            $schema = BuildSchema::build($contents);
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = isset($input['variables']) ? $input['variables'] : null;

            $rootValue = [
                'issues' => function($root, $args, $context) {
                    $sum = new getAllIssue();
                    return $sum->resolve($root, $args, $context);
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
