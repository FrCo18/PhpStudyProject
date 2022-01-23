<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Auth routes
Route::get( '/checkauth', [ AuthController::class, 'checkAuth' ] );
Route::post( '/login', [ AuthController::class, 'login' ] );
Route::post( '/register', [ AuthController::class, 'register' ] );
Route::post( '/logout', [ AuthController::class, 'logout' ] );

//Courses routes
Route::get( '/courses', [ CourseController::class, 'getCourses' ] )->middleware( 'auth:sanctum' );

//Route::middleware( 'auth:sanctum' )->get( '/user', function ( Request $request ) {
//    return $request->user();
//} );
