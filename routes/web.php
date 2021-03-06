<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
/**
 * Routes for resource graph-q-l
 */
$router->post('graphql', 'GraphQLController@index');
$router->get('generate', 'GraphQLController@generate');
$router->post('login', 'AuthController@postLogin');
$router->post('register', 'AuthController@register');
