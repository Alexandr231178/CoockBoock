<?php

namespace App\Models\Sets;

use App\Models\Dishes\Dishes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SetsComponents extends Model
{
    protected $fillable = ['name', 'sets_of_dishes_id', 'dishes_id', 'quantity'];

    public function set_dishes(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(SetsOfDishes::class);
    }


    public function dishes(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Dishes::class);
    }
}
