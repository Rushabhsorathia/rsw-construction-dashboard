<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BudgetController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                ['category' => 'Labour', 'committed' => 4.2, 'spent' => 3.8, 'budget' => 5.5],
                ['category' => 'Materials', 'committed' => 8.1, 'spent' => 6.4, 'budget' => 9.0],
                ['category' => 'Plant & Equipment', 'committed' => 1.8, 'spent' => 1.5, 'budget' => 2.0],
                ['category' => 'Subcontractors', 'committed' => 7.2, 'spent' => 5.1, 'budget' => 8.5],
                ['category' => 'Prelims', 'committed' => 0.9, 'spent' => 0.7, 'budget' => 1.0],
                ['category' => 'Contingency', 'committed' => 0.0, 'spent' => 0.0, 'budget' => 2.5],
            ],
        ]);
    }
}
