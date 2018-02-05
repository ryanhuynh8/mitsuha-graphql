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
        return $this->created_at->toDateTimeString();
    }

    public function getUpdatedAttribute() {
        return $this->updated_at->toDateTimeString();
    }

    public function getFooAttribute() {
        return "haha";
    }

//    public function getFooAttribute() {
//        return 'bar';
//    }
//
//    public function getUpdatedAtAttribute($value)
//    {
//        return $this->status;
//    }


    // Relationships

}
