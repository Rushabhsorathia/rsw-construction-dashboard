<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class GanttTaskController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                ['id' => 1, 'name' => 'Groundworks & Foundations', 'start' => 0, 'end' => 4, 'phase' => 1, 'complete' => 100],
                ['id' => 2, 'name' => 'Steel Frame Erection', 'start' => 3, 'end' => 8, 'phase' => 1, 'complete' => 100],
                ['id' => 3, 'name' => 'Concrete Floors (Floors 1-5)', 'start' => 5, 'end' => 10, 'phase' => 2, 'complete' => 85],
                ['id' => 4, 'name' => 'External Cladding', 'start' => 8, 'end' => 14, 'phase' => 2, 'complete' => 45],
                ['id' => 5, 'name' => 'M&E First Fix', 'start' => 9, 'end' => 16, 'phase' => 3, 'complete' => 20],
                ['id' => 6, 'name' => 'Brickwork & Internal Partitions', 'start' => 10, 'end' => 18, 'phase' => 3, 'complete' => 10],
                ['id' => 7, 'name' => 'Windows & Glazing', 'start' => 11, 'end' => 16, 'phase' => 3, 'complete' => 0],
                ['id' => 8, 'name' => 'Roofing & Weatherproofing', 'start' => 14, 'end' => 18, 'phase' => 4, 'complete' => 0],
                ['id' => 9, 'name' => 'Second Fix & Finishes', 'start' => 16, 'end' => 22, 'phase' => 4, 'complete' => 0],
                ['id' => 10, 'name' => 'Snagging & Handover', 'start' => 22, 'end' => 26, 'phase' => 5, 'complete' => 0],
            ],
        ]);
    }
}
