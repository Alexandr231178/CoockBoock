<?php

namespace App\Models\Products;

use App\Models\Dishes\DishesComponent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Products extends Model
{
    protected $fillable = ['name','description'];
    public function products_groups(): belongsTo
    {
        return $this->belongsTo(ProductsGroup::class);
    }

    public function dish_components(): HasMany
    {
        return $this->hasMany(DishesComponent::class);
    }
}
