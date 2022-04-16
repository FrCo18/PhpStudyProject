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
            ->select( 'Courses.id_course', 'Courses.name as course', 'DifficultyCourse.name as difficulty', 'Courses.description' )
            ->join( 'DifficultyCourse', 'Courses.id_difficulty', '=', 'DifficultyCourse.id_difficulty' )
            ->orderBy('Courses.id_course')
            ->get()
        );
        return response()->json( $courses );
    }
}
