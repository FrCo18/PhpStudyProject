<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\ProgressCourse;
use App\Models\ProgressTask;
use App\Models\Tasks;
use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    public function getCourses(Request $request): JsonResponse
    {
        $request_params = [
            'id_user' => $request->get('id_user'),
        ];

        $check_params = self::checkExistsParams($request_params);

        if ($check_params instanceof JsonResponse) {
            return $check_params;
        }

        $courses = Course::getJoinCourses($request_params['id_user']);
        return response()->json($courses);
    }

    /**
     * @throws Exception
     */
    public function setProgressCourse(Request $request): JsonResponse|\Illuminate\Http\JsonResponse
    {
        $request_params = [
            'id_user' => $request->get('id_user'),
            'id_course' => $request->get('id_course'),
        ];

        $check_params = self::checkExistsParams($request_params);

        if ($check_params instanceof JsonResponse) {
            return $check_params;
        }

        $is_complete = ProgressTask::isCompleteAllTasks($request_params['id_course'], $request_params['id_user']);

        $result = ProgressCourse::setProgressCourse($request_params['id_course'], $request_params['id_user'], $is_complete);

        if (!$result) {
            throw new Exception('Fail set to ProgressCourses', 500);
        }

        return response()->json(['message' => 'complete']);
    }
}
