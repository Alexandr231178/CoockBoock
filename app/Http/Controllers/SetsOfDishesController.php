<?php

namespace App\Http\Controllers;

use App\Http\Requests\SetsRequest;
use App\Models\Sets\SetsOfDishes;
use Illuminate\Http\Request;

class SetsOfDishesController extends Controller
{
    public function index() {
        return SetsOfDishes::all();
    }

    public function store(SetsRequest $request) {
        return SetsOfDishes::create($request->all());
    }

    public function destroy($id) {
//        $setsComponents = SetsOfDishes::find($id)->sets_components;
//        dd($setsComponents);
        return SetsOfDishes::destroy($id);
    }
}
