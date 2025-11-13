<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductsGroup extends Model
{
    public function products(): HasMany
    {
        return $this->hasMany(Products::class, 'group_id');
    }
}
