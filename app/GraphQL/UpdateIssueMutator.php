<?php
/**
 * Created by PhpStorm.
 * User: hideki
 * Date: 2/18/2018
 * Time: 10:30 PM
 */

namespace App\GraphQL;

use App;
use App\GraphQL\Mutator;

class UpdateIssueMutator implements Mutator
{
    public function mutate($root, $args, $context)
    {
        $id = $args['id'];
        $title = $args['title'];
        $content = $args['content'];
        try {
            $issue = App\Issue::where('id', $id)->first();
            $issue->description = $content;
            $issue->title = $title;
            $issue->save();
            return 'SUCCESS';
        } catch (Exception $e) {
            return 'FAILURE';
        }
    }
}