<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class TasksController extends Controller
{
    public function getTasksByCourseId(Request $request): JsonResponse
    {
        $id_course = $request->get('id');

        if (is_null($id_course)) {
            return response()->json(['error' => 'param id not found'], 404);
        }

        $tasks = Tasks::getTasksByCourseId($id_course);
        return response()->json($tasks);
    }

    public function getTaskById(Request $request): JsonResponse
    {
        $id_task = $request->get('id');

        if (is_null($id_task)) {
            return response()->json(['error' => 'param id not found'], 404);
        }

        $task = Tasks::getTaskById($id_task);
        return response()->json($task);
    }

    public function checkTask(Request $request)
    {
        $php_code = $request->get('php_code');

        if (!$php_code) {
            return response()->json(['error' => 'param php_code not found'], 404);
        }

        $php_code = preg_replace('/^\s*<\?php|\?>\s*$/', '', $php_code);

        try {
            $return_result = eval($php_code);

            if($return_result){
                //...something logic
            }
        }catch (\ParseError|\ErrorException $e) {
            return $e->getMessage();
        }

        return '';
    }
}
