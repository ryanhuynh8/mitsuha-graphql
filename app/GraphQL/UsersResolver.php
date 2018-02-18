<?php
/**
 * Created by PhpStorm.
 * User: hideki
 * Date: 2/18/2018
 * Time: 8:17 PM
 */

namespace App\GraphQL;

use App;
use App\ProjectUser;
use App\User;
use App\GraphQL\Resolver;

class UsersResolver
{
    public function resolve($root, $args, $context)
    {
        try {
            $projectId = $args['projectId'];
            $usersId = ProjectUser::where('project_id', $projectId)->select('user_id')->get();
            $users = User::whereIn('id', $usersId)->get();
            return $users;
        } catch (Exception $exception) {
            echo $exception;
        }
    }
}