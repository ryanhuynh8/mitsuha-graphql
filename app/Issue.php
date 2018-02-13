<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model {

    protected $fillable = [];

    protected $dates = [];

    public static $snakeAttributes = true;

    public static $rules = [
        // Validation rules
    ];

    public function getCreatedAttribute() {
        return $this->created_at->timestamp;
    }

    public function getUpdatedAttribute() {
        return $this->updated_at->timestamp;
    }

    public function getFooAttribute() {
        return "haha";
    }

    // Relationships

}
