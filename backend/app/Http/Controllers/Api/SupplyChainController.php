<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class SupplyChainController extends Controller
{
    public function index(): JsonResponse
    {
        // TODO: Replace with Eloquent model
        return response()->json(['data' => [], 'message' => 'Supply chain data seeded from mock']);
    }
}
