<?php
/**
 * Created by PhpStorm.
 * User: RyanHuynh
 * Date: 2/13/2018
 * Time: 3:35 PM
 */

namespace App\GraphQL;

interface Resolver {
    public function resolve($root, $args, $context);
}