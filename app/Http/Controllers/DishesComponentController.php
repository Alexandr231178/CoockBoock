<?php

namespace App\Http\Controllers;

use App\Models\Dishes\DishesComponent;
use Illuminate\Http\Request;

class DishesComponentController extends Controller
{
    public function index() {
        return DishesComponent::all();
    }
}
