<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        // TODO: Replace with Eloquent model query
        $projects = [
            [
                'id' => 1,
                'name' => 'Battersea Phase 2 — Residential Tower',
                'client' => 'Hartwell Developments',
                'value' => '£24.5M',
                'value_num' => 24.5,
                'progress' => 67,
                'status' => 'On Track',
                'days_left' => 142,
                'health' => 'green',
                'location' => 'London',
                'type' => 'Residential',
                'start_date' => 'Mar 2024',
                'end_date' => 'Oct 2027',
                'manager' => 'Tom Mitchell',
                'spi' => 0.98,
                'cpi' => 1.02,
            ],
            [
                'id' => 2,
                'name' => 'Manchester Metro Hub — Mixed Use',
                'client' => 'Metro City Group',
                'value' => '£38.2M',
                'value_num' => 38.2,
                'progress' => 41,
                'status' => 'At Risk',
                'days_left' => 287,
                'health' => 'orange',
                'location' => 'Manchester',
                'type' => 'Mixed Use',
                'start_date' => 'Jun 2025',
                'end_date' => 'Mar 2028',
                'manager' => 'Sarah Collins',
                'spi' => 0.91,
                'cpi' => 0.97,
            ],
            [
                'id' => 3,
                'name' => 'Bristol Harbour Bridge — Infrastructure',
                'client' => 'Bristol City Council',
                'value' => '£12.8M',
                'value_num' => 12.8,
                'progress' => 82,
                'status' => 'On Track',
                'days_left' => 48,
                'health' => 'green',
                'location' => 'Bristol',
                'type' => 'Infrastructure',
                'start_date' => 'May 2025',
                'end_date' => 'Jun 2026',
                'manager' => 'James Whitfield',
                'spi' => 1.01,
                'cpi' => 1.04,
            ],
            [
                'id' => 4,
                'name' => 'Leeds Green Park — Residential Estate',
                'client' => 'Green Park Living',
                'value' => '£18.4M',
                'value_num' => 18.4,
                'progress' => 28,
                'status' => 'Delayed',
                'days_left' => 412,
                'health' => 'red',
                'location' => 'Leeds',
                'type' => 'Residential',
                'start_date' => 'Aug 2025',
                'end_date' => 'Dec 2028',
                'manager' => 'Priya Sharma',
                'spi' => 0.85,
                'cpi' => 0.95,
            ],
            [
                'id' => 5,
                'name' => 'Newcastle Innovation Centre — Commercial',
                'client' => 'North East Tech Corp',
                'value' => '£9.7M',
                'value_num' => 9.7,
                'progress' => 15,
                'status' => 'On Track',
                'days_left' => 540,
                'health' => 'green',
                'location' => 'Newcastle',
                'type' => 'Commercial',
                'start_date' => 'Jan 2026',
                'end_date' => 'Dec 2028',
                'manager' => 'Alex Thornton',
                'spi' => 1.00,
                'cpi' => 1.01,
            ],
            [
                'id' => 6,
                'name' => 'Birmingham Central Plaza — Mixed Use',
                'client' => 'Midlands Development Group',
                'value' => '£31.5M',
                'value_num' => 31.5,
                'progress' => 55,
                'status' => 'At Risk',
                'days_left' => 198,
                'health' => 'orange',
                'location' => 'Birmingham',
                'type' => 'Mixed Use',
                'start_date' => 'Oct 2024',
                'end_date' => 'Dec 2027',
                'manager' => 'Rachel Okafor',
                'spi' => 0.93,
                'cpi' => 0.98,
            ],
        ];

        return response()->json([
            'data' => $projects,
            'stats' => [
                'active' => 6,
                'at_risk' => 2,
                'delayed' => 1,
                'total_value' => 135.1,
                'total_budget' => 28.5,
                'total_committed' => 22.2,
                'total_spent' => 17.5,
            ],
        ]);
    }

    public function show($id): JsonResponse
    {
        // TODO: Replace with Eloquent findOrFail
        $projects = $this->index()->getData()->data;
        $project = collect($projects)->firstWhere('id', (int) $id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json(['data' => $project]);
    }
}
