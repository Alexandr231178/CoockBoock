<?php

namespace App\Models\Dishes;

use App\Models\Products\Products;
use Illuminate\Database\Eloquent\Model;

class DishesComponent extends Model
{
    protected $fillable = ['products_id', 'dishes_id', 'quantity'];

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Products::class);
    }


    public function dishes(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Dishes::class);
    }
}
