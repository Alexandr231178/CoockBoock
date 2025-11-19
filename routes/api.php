<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DishesController;
use App\Http\Controllers\DishesGroupController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::post('/register', [AuthController::class, 'register'])->middleware(['throttle:api']);
Route::post('/login', [AuthController::class, 'login'])->middleware(['throttle:api']);

Route::get('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum', 'throttle:api']);
Route::get('/users', [AuthController::class, 'users'])->middleware(['auth:sanctum', 'throttle:api']);

Route::prefix('dishesgroup')
    ->controller(DishesGroupController::class)
    ->group(function () {
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/', 'index')->name('index');
        Route::get('/{id}', 'show')->name('show');
        Route::get('/{id}/edit', 'edit')->name('edit');
        Route::post('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });

Route::prefix('dishes')
    ->controller(DishesController::class)
    ->group(function () {
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/', 'index')->name('index');
        Route::get('/{id}', 'show')->name('show');
        Route::get('/{id}/edit', 'edit')->name('edit');
        Route::post('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });





