<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(StoreUserRequest $request)
    {
        return User::create($request->all());

    }

    public function login(LoginUserRequest $request)
    {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                "message" => "Нет такого"
            ], 401);
        }
        $user = Auth::user();
        $user->tokens()->delete();
        return response()->json([
            $user,
            'token' => $user->createToken("Token of user: {$user->name}")->plainTextToken
        ]);

    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            "message" => "You have successfully logged out.",
        ]);
    }

    public function users()
    {
        return User::all();
    }


}
