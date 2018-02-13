<?php
/**
 * Created by PhpStorm.
 * User: RyanHuynh
 * Date: 2/13/2018
 * Time: 10:44 AM
 */
use GraphQL\Error\ClientAware;

class PermissionDeniedException extends \Exception implements ClientAware
{
    public function isClientSafe()
    {
        return true;
    }

    public function getCategory()
    {
        return 'permissionDenied';
    }
}