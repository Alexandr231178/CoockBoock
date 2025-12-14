<?php

namespace App\Http\Controllers;

use App\Http\Requests\SetsComponentsRequest;
use App\Models\Sets\SetsComponents;


class SetsComponentsController extends Controller
{
    public function index() {
        return SetsComponents::all();
    }

    public function store(SetsComponentsRequest $request) {
        return SetsComponents::create($request->all());
    }

    public function destroy($id) {
        return SetsComponents::destroy($id);
    }
}
