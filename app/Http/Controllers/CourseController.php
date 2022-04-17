<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Symfony\Component\HttpFoundation\JsonResponse;

class CourseController extends Controller
{
    public function getCourses(): JsonResponse
    {
        $courses = Course::getJoinCourses();
        return response()->json($courses);
    }
}
