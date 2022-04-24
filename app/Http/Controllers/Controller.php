<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public static function checkExistsParams(array $request_params): bool|JsonResponse
    {
        foreach ($request_params as $key => $param) {
            if (!$param) {
                return  response()->json(['error' => "param $key not found"], 403);
            }
        }

        return true;
    }
}
