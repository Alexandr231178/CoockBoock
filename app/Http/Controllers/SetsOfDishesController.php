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

    public function update(SetsRequest $request) {
        $updateSet = SetsOfDishes::find($request->id);
        $updateSet->name = $request['name'];
        $updateSet->description = $request['description'];
        $updateSet->save();

    }


    public function destroy($id) {
        return SetsOfDishes::destroy($id);
    }
}
