<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use JetBrains\PhpStorm\ArrayShape;

class AuthController extends Controller
{
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }

    #[ArrayShape(['token' => "mixed"])]
    public function register(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|unique:Users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('apptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        //Проверка на email
        $user = User::where('email', $fields['email'])->first();

        //Проверка пароля
        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response(['message' => 'Bad creds'], 401);
        }

        $token = $user->createToken('apptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
}
