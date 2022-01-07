<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseCollection;
use App\Models\Course;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class CourseController extends Controller
{
    public function getCourses(): JsonResponse
    {
        $courses = ( Course::query()
            ->select( 'Courses.idCourse', 'Courses.name as course', 'DifficultyCourse.name as difficulty' )
            ->join( 'DifficultyCourse', 'Courses.idDifficulty', '=', 'DifficultyCourse.idDifficulty' )
            ->get()->toJson()
        );
        return response()->json( $courses );
    }
}
