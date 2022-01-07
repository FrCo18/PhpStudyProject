<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Throwable;

class AuthController extends Controller
{
    public function login( Request $request )
    {
        $attributes = User::where( 'email', $request->get( 'email' ) )->first();

        if ( isset( $attributes->token ) ) {
            return response()->redirectTo( '/' )->cookie( 'token', $attributes->token, 60 );
        }

        return redirect()->back();
    }

    public function logout()
    {
        return response()->redirectTo( '/' )->cookie( 'token', '', 0 );
    }

    public function register( Request $request ): RedirectResponse
    {
        $user_info = [
            'token' => $this->generateRandomHash()
        ];

        while ( isset( User::where( 'token', $user_info[ 'token' ] )->limit( 1 )->get( 'email' )[ 0 ] ) ) {
            $user_info[ 'token' ] = $this->generateRandomHash();
        }

        $user = new User();
        $user->email = $request->get( 'email' );
        $user->password = $request->get( 'password' );
        $user->token = $user_info[ 'token' ];
        $user->save();

        return response()->redirectTo( '/' )->cookie( 'token', $user_info[ 'token' ], 60 );
    }

    private function generateRandomHash(): string
    {
        return Str::random( 100 );
    }

    public function checkAuth( Request $request ): JsonResponse
    {
        $token = $request->cookies->get( 'token' );
        $attributes = User::where( 'token', $token )->limit( 1 )->get();
        if ( isset( $attributes[ 0 ] ) ) {
            $attributes = $attributes[ 0 ];
            $attributes[ 'is_auth' ] = true;
            $output_info = [
                'email' => $attributes[ 'email' ],
                'is_auth' => true
            ];
        } else {
            $output_info[ 'is_auth' ] = false;
        }


        return response()->json( $output_info );
    }
}
