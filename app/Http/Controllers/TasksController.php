<?php

namespace App\Http\Controllers;

use App\Courses\TaskChecker;
use App\Models\ProgressTask;
use App\Models\Tasks;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class TasksController extends Controller
{
    public function getTasksByCourseId(Request $request): JsonResponse
    {
        $request_params = [
            'id_course' => $request->get('id_course'),
            'id_user' => $request->get('id_user')
        ];

        $check_params = self::checkExistsParams($request_params);

        if ($check_params instanceof JsonResponse) {
            return $check_params;
        }

        $tasks = Tasks::getTasksByCourseId($request_params['id_course'], $request_params['id_user']);
        return response()->json($tasks);
    }

    public function getTaskById(Request $request): JsonResponse
    {
        $request_params = [
            'id_task' => $request->get('id_task'),
            'id_user' => $request->get('id_user')
        ];

        $check_params = self::checkExistsParams($request_params);

        if ($check_params instanceof JsonResponse) {
            return $check_params;
        }

        $task = Tasks::getTaskById($request_params['id_task'], $request_params['id_user']);
        $task['is_complete'] = $task['is_complete'] ?: false;
        return response()->json($task);
    }

    public function checkTask(Request $request)
    {
        $request_params = [
            'php_code' => $request->get('php_code'),
            'course_name' => $request->get('course_name'),
            'level_number' => $request->get('level_number'),
            'id_user' => $request->get('id_user'),
            'id_task' => $request->get('id_task'),
        ];

        $check_params = self::checkExistsParams($request_params);

        if ($check_params instanceof JsonResponse) {
            return $check_params;
        }

        $echo_system_var = '';

        $arr_replaces = [
            '/^\s*<\?php|\?>\s*$/' => '',
            '/\$echo_system_var/' => '$echo_system_var1',
            '/echo/' => '$echo_system_var .='
        ];

        $php_code = preg_replace(array_keys($arr_replaces), $arr_replaces, $request_params['php_code']);

        try {
            $eval_result = eval($php_code) ?: '';

            $task_checker = new TaskChecker($request_params['course_name'], $request_params['level_number']);
            $is_complete = $task_checker->checkTask($request_params['php_code'], $eval_result, $echo_system_var);

            $result = ProgressTask::setProgressTask($request_params['id_task'], $request_params['id_user'], $is_complete);
            if (!$result) {
                throw new \Exception('Fail set to ProgressTasks', 500);
            }

            return [
                'is_complete' => $is_complete,
                'eval_result' => $eval_result ?? '',
                'error_text' => '',
                'echo_text' => $echo_system_var
            ];

        } catch (\ParseError|\ErrorException|\Error $e) {
            return [
                'is_complete' => false,
                'eval_result' => '',
                'error_text' => $e->getMessage(),
                'echo_text' => $echo_system_var
            ];
        }
    }
}
