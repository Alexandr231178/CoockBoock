<?php

namespace App\Models\Dishes;

use App\Models\Sets\SetsComponents;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dishes extends Model
{
    protected $fillable = ['name', 'dish_group_id', 'description', 'how_to_cook', 'how_to_cook'];
    public function dish_groups(): belongsTo
    {
        return $this->belongsTo(DishesGroup::class);
    }

    public function sets_components(): hasMany
    {
        return $this->hasMany(SetsComponents::class);
    }

    public function dish_components(): HasMany
    {
        return $this->hasMany(DishesComponent::class);
    }
}
