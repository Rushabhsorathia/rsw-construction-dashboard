<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class HealthSafetyController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                ['label' => 'Near Miss Reports', 'value' => 12, 'change' => '+3 vs last month', 'trend' => 'up'],
                ['label' => 'RIDDOR Incidents', 'value' => 1, 'change' => 'No change', 'trend' => 'stable'],
                ['label' => 'Toolbox Talks Delivered', 'value' => 47, 'change' => '+8 vs last month', 'trend' => 'up'],
                ['label' => 'CSCS Cards Checked', 'value' => '98%', 'change' => 'Target: 100%', 'trend' => 'stable'],
                ['label' => 'Fire Drill Completed', 'value' => '15 Apr', 'change' => 'Next due: 15 May', 'trend' => 'stable'],
                ['label' => 'PPE Compliance', 'value' => '99%', 'change' => '-1% vs last month', 'trend' => 'down'],
            ],
        ]);
    }
}
