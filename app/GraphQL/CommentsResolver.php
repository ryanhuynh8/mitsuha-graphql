<?php
/**
 * Created by PhpStorm.
 * User: RyanHuynh
 * Date: 2/13/2018
 * Time: 1:35 PM
 */

namespace App\GraphQL;

use App;
use App\GraphQL\Resolver;

class CommentsResolver implements Resolver
{
    public function resolve($root, $args, $context)
    {
        $id = $args['id'];
        $comments = App\Comment::where('issue_id', $id)->get();
        $result = $comments->toArray();
        $result = array_map(function ($comment) {
            return
                [
                    'createdBy' => $comment['user_id'],
                    'comment' => $comment['comment']
                ];
        }, $result);
        return $result;
    }
}