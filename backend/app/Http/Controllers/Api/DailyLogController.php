<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class DailyLogController extends Controller
{
    public function index(): JsonResponse
    {
        // TODO: Replace with Eloquent model
        return response()->json(['data' => [], 'message' => 'Daily logs data seeded from mock']);
    }
}
