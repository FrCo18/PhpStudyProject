<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use JetBrains\PhpStorm\ArrayShape;

class AuthController extends Controller
{
    #[ArrayShape(['auth' => "false"])]
    public function logout(Request $request): array
    {
        $request->user()->tokens()->delete();

        return [
            'auth' => false
        ];
    }

    #[ArrayShape(['token' => "mixed"])]
    public function register(Request $request): Response|Application|ResponseFactory
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

        $user_response = [
            'id' => $user->idUser,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'middle_name' => $user->middle_name,
            'email' => $user->email,
        ];

        $response = [
            'user' => $user_response,
            'token' => $token,
            'auth' => true
        ];

        return response($response, 201);
    }

    public function login(Request $request): Response|Application|ResponseFactory
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        //Проверка на email
        $user = User::where('email', $fields['email'])->first();

        //Проверка пароля
        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response(['auth' => false], 401);
        }

        $token = $user->createToken('apptoken')->plainTextToken;

        $user_response = [
            'id' => $user->idUser,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'middle_name' => $user->middle_name,
            'email' => $user->email,
        ];

        $response = [
            'user' => $user_response,
            'token' => $token,
            'auth' => true
        ];

        return response($response, 201);
    }
}
