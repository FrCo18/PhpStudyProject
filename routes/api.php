<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\TasksController;
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

//Auth
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function (){
    Route::post('/logout', [AuthController::class, 'logout']);

    //Courses routes
    Route::prefix('courses')->group(function (){
        Route::get('/', [CoursesController::class, 'getCourses']);

        //Tasks
        Route::get('/tasks-by-course-id/', [TasksController::class, 'getTasksByCourseId']);
        Route::get('/task-by-id/', [TasksController::class, 'getTaskById']);
        Route::post('/check-task/', [TasksController::class, 'checkTask']);
    });

    Route::post('/compile-code/', [TasksController::class, 'compileCode']);
});
