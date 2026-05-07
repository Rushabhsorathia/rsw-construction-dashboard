<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class RiskRegisterController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                ['id' => 1, 'title' => 'Cladding subcontractor delays', 'description' => 'Current cladding subcontractor is 5 days behind schedule on Battersea Phase 2.', 'category' => 'Schedule', 'likelihood' => 4, 'impact' => 4, 'score' => 16, 'status' => 'Open', 'owner' => 'Tom Mitchell', 'project' => 'Battersea Phase 2', 'mitigation' => 'Accelerate works with overtime. Source backup subcontractor.'],
                ['id' => 2, 'title' => 'Steel price volatility', 'description' => 'Steel prices have increased 12% this quarter. May impact remaining structural works budget.', 'category' => 'Financial', 'likelihood' => 3, 'impact' => 3, 'score' => 9, 'status' => 'Monitoring', 'owner' => 'Sarah Collins', 'project' => 'Manchester Metro Hub', 'mitigation' => 'Lock in pricing with fixed-price POs for next 6 months.'],
                ['id' => 3, 'title' => 'Ground conditions unknown', 'description' => 'Site investigation report incomplete for Leeds Green Park. Contaminated land risk.', 'category' => 'Technical', 'likelihood' => 3, 'impact' => 5, 'score' => 15, 'status' => 'Open', 'owner' => 'Priya Sharma', 'project' => 'Leeds Green Park', 'mitigation' => 'Commission full Phase 2 ground investigation before foundation works.'],
                ['id' => 4, 'title' => 'Scaffolder capacity at 100%', 'description' => 'All scaffolders fully allocated. Any absence will delay Bristol Harbour Bridge critical path.', 'category' => 'Resource', 'likelihood' => 4, 'impact' => 4, 'score' => 16, 'status' => 'Open', 'owner' => 'James Whitfield', 'project' => 'Bristol Harbour Bridge', 'mitigation' => 'Engage backup scaffolding firm. Cross-train site labour.'],
                ['id' => 5, 'title' => 'Planning condition compliance', 'description' => 'Noise restriction hours may extend programme by 2 weeks on Birmingham Central Plaza.', 'category' => 'Regulatory', 'likelihood' => 2, 'impact' => 3, 'score' => 6, 'status' => 'Closed', 'owner' => 'Rachel Okafor', 'project' => 'Birmingham Central Plaza', 'mitigation' => 'Agreed extended hours with local authority. Condition discharged.'],
                ['id' => 6, 'title' => 'H&S near miss trend increasing', 'description' => '12 near misses this month on Leeds site — 3x higher than normal. Groundworks phase.', 'category' => 'Health & Safety', 'likelihood' => 4, 'impact' => 5, 'score' => 20, 'status' => 'Open', 'owner' => 'Priya Sharma', 'project' => 'Leeds Green Park', 'mitigation' => 'Conduct immediate toolbox talk. Increase supervision on groundworks.'],
            ],
        ]);
    }
}
