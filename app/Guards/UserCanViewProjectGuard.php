<?php
/**
 * Created by PhpStorm.
 * User: hideki
 * Date: 2/19/2018
 * Time: 10:48 PM
 */

namespace App\Guards;

use App\Permission;
use App\Exceptions\PermissionDeniedException;

class UserCanViewProjectGuard
{
    public static function guard($userId, $projectId) {
        if (Permission::where(['user_id' => $userId, 'project_id' => $projectId])->first() !== null)
            return true;
        else
            throw new PermissionDeniedException();
    }
}