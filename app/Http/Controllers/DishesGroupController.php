<?php

namespace App\Http\Controllers;

use App\Models\Dishes\DishesGroup;
use Illuminate\Http\Request;

class DishesGroupController extends Controller
{
    public function index(): \Illuminate\Database\Eloquent\Collection
    {
        return DishesGroup::all();
    }
}
