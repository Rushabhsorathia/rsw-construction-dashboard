<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AIController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string',
            'project_id' => 'nullable|integer',
        ]);

        // TODO: Integrate with LLM API (GLM-5, OpenAI, etc.)
        return response()->json([
            'response' => 'AI assistant is being configured. This endpoint will connect to an LLM provider.',
            'insights' => [],
        ]);
    }
}
