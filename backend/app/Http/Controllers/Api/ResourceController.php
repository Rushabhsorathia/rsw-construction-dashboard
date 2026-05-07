<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ResourceController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                ['trade' => 'Bricklayers', 'allocated' => 32, 'available' => 38, 'forecast' => 40, 'pct' => 84],
                ['trade' => 'Carpenters', 'allocated' => 18, 'available' => 20, 'forecast' => 22, 'pct' => 90],
                ['trade' => 'M&E Engineers', 'allocated' => 12, 'available' => 15, 'forecast' => 18, 'pct' => 80],
                ['trade' => 'Scaffolders', 'allocated' => 8, 'available' => 8, 'forecast' => 10, 'pct' => 100],
                ['trade' => 'Steel Fixers', 'allocated' => 14, 'available' => 16, 'forecast' => 16, 'pct' => 88],
                ['trade' => 'Roofers', 'allocated' => 6, 'available' => 10, 'forecast' => 10, 'pct' => 60],
                ['trade' => 'Plasterers', 'allocated' => 20, 'available' => 22, 'forecast' => 24, 'pct' => 91],
                ['trade' => 'Painters', 'allocated' => 10, 'available' => 12, 'forecast' => 14, 'pct' => 83],
            ],
        ]);
    }
}
