<?php

namespace App\Http\Controllers;

use App\Models\Dishes\Dishes;
use App\Models\Dishes\DishesGroup;
use Illuminate\Http\Request;

class DishesController extends Controller
{
    public function index(): \Illuminate\Database\Eloquent\Collection
    {
        return Dishes::all();
    }

    public function destroy(int $id) {

    }
}
