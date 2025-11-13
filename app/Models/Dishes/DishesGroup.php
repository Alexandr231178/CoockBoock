<?php

namespace App\Models\Dishes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DishesGroup extends Model
{
    public function dishes(): HasMany
    {
        return $this->hasMany(Dishes::class);
    }
}
