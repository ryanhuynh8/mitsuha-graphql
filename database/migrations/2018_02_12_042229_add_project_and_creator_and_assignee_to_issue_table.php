<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectAndCreatorAndAssigneeToIssueTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('issues', function (Blueprint $table) {
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('project_id')->unsigned()->nullable();
            $table->integer('assignee_id')->unsigned()->nullable();
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('issues', function (Blueprint $table) {
            $table->dropColumn('created_by');
            $table->dropColumn('project_id');
            $table->dropColumn('assignee_id');
            $table->dropForeign('created_by');
        });
    }
}
