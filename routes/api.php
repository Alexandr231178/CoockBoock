<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::post('register', [AuthController::class, 'register'])->middleware(['throttle:api']);
Route::post('login', [AuthController::class, 'login'])->middleware(['throttle:api']);

Route::get('logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum', 'throttle:api']);
Route::apiResource('products', ProductController::class)->middleware(['auth:sanctum', 'throttle:api']);
