<?php

namespace App\Http\Controllers;

use App\Models\Products\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index() {
        return Products::all();
    }
}
