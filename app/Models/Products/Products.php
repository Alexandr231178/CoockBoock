<?php

namespace App\Models\Products;

use App\Models\Dishes\DishesComponent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Products extends Model
{
    protected $fillable = ['name'];

    public function dish_components(): HasMany
    {
        return $this->hasMany(DishesComponent::class);
    }
}

