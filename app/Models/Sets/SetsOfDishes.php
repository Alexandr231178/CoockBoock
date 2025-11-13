<?php

namespace App\Models\Sets;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SetsOfDishes extends Model
{
    protected $fillable = ['name', 'description'];

    public function sets_components(): hasMany
    {
        return $this->hasMany(SetsComponents::class);
    }
}
