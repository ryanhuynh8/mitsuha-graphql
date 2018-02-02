<?php
/**
 * Created by PhpStorm.
 * User: RyanHuynh
 * Date: 2/1/2018
 * Time: 3:50 PM
 */
require_once __DIR__ . '/../vendor/autoload.php';

use GraphQL\Utils\BuildSchema;
use GraphQL\GraphQL;

$superResolver = function($rootValue, $args, $context, $resolveInfo) {
    return json_encode($args['input']['firstName']);
};

try {
    $contents = file_get_contents('../schema/schema.graphql');
    $schema = BuildSchema::build($contents);

    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    $query = $input['query'];
    $variableValues = isset($input['variables']) ? $input['variables'] : null;
    $rootValue = ['prefix' => 'You said: '];
    if (strpos($query, 'query IntrospectionQuery {') !== false) { // black magic
        $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues, null, null);
    } else {
        $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues, null, $superResolver);
    }
    $output = $result->toArray();
} catch (\Exception $e) {
    $output = [
        'error' => [
            'message' => $e->getMessage()
        ]
    ];
}
header('Content-Type: application/json; charset=UTF-8');
//echo json_encode($result); die;
echo json_encode($output);