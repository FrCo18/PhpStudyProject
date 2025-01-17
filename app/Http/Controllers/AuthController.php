<?php

namespace App\Http\Controllers;

use App\Mail\ResetPassword;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use JetBrains\PhpStorm\ArrayShape;
use Symfony\Component\HttpFoundation\JsonResponse;

class AuthController extends Controller
{

    public function destroy(Request $request): JsonResponse|\Illuminate\Http\JsonResponse
    {
        $request_params = [
            'id_user' => $request->get('id_user'),
        ];

        $request->user()->tokens()->delete();

        $check_params = self::checkExistsParams($request_params);

        if ($check_params instanceof JsonResponse) {
            return $check_params;
        }

        $request_params['id_user'] = User::decryptUserId($request_params['id_user']);

        if ($request_params['id_user'] instanceof JsonResponse) {
            return $request_params['id_user'];
        }

        DB::select('delete from "ProgressTasks" where "id_user" = ' . $request_params['id_user']);
        DB::select('delete from "ProgressCourses" where "id_user" = ' . $request_params['id_user']);

        User::destroy($request_params['id_user']);

        return response()->json(['message' => "user deleted"]);
    }

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
            'password' => 'required|string|confirmed|max:20|min:8',
        ]);

        $user = User::create([
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('apptoken')->plainTextToken;

        $user_response = [
            'id' => Crypt::encrypt($user->idUser),
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
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response(['auth' => false], 401);
        }

        $token = $user->createToken('apptoken')->plainTextToken;

        $user_response = [
            'id' => Crypt::encrypt($user->idUser),
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

    public function sendResetPasswordEmail(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'email' => 'required|email'
        ]);

        /**
         * @var User $user
         */
        $user = User::where('email', '=', $fields['email'])->first();

        if (!$user) {
            return \response()->json(['msg' => 'user not found'], 403);
        }

        Password::createToken($user);

        $token = DB::table('password_resets')
            ->select('token')
            ->where('email', '=', $user->email)
            ->first();

        Mail::to($user->email)->send(new ResetPassword($user->email, urlencode($token->token)));

        return response()->json([
            'msg' => 'mail for password reset sent on your',
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'email' => 'required',
            'token' => 'required',
            'password' => 'required|string|confirmed|max:20|min:8'
        ]);

        $find_reset = DB::table('password_resets')
            ->where('token', '=', $fields['token'])
            ->where('email', '=', $fields['email'])
            ->first();

        if (!$find_reset) {
            return response()->json(['msg' => 'Токен не найден'], 403);
        }

        /**
         * @var User $user
         */
        $user = Password::getUser($request->only('email'));
        $user->password = bcrypt($fields['password']);
        $user->save();

        Password::deleteToken($user);
        return \response()->json(['msg' => 'Пароль успешно изменён!']);
    }
}
