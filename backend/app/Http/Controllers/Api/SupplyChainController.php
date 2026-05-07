<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class SupplyChainController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                'deliveries' => [
                    ['id' => 'PO-2026-0142', 'item' => 'Structural Steel Beams', 'supplier' => 'British Steel', 'project' => 'Battersea Phase 2', 'qty' => '45 tonnes', 'value' => '£38,250', 'expected' => '12 May 2026', 'actual' => '12 May 2026', 'status' => 'On Time', 'delay' => 0, 'priority' => 'High'],
                    ['id' => 'PO-2026-0138', 'item' => 'Concrete Blocks (100mm)', 'supplier' => 'Hanson UK', 'project' => 'Manchester Metro Hub', 'qty' => '12,000 units', 'value' => '£8,400', 'expected' => '10 May 2026', 'actual' => '10 May 2026', 'status' => 'On Time', 'delay' => 0, 'priority' => 'Medium'],
                    ['id' => 'PO-2026-0151', 'item' => 'Cladding Panels (Aluminium)', 'supplier' => 'Sotech Ltd', 'project' => 'Battersea Phase 2', 'qty' => '850 sqm', 'value' => '£127,500', 'expected' => '18 May 2026', 'actual' => '25 May 2026', 'status' => 'Delayed', 'delay' => 7, 'priority' => 'Critical'],
                    ['id' => 'PO-2026-0155', 'item' => 'Rebar (12mm & 16mm)', 'supplier' => 'Celsa Steel', 'project' => 'Leeds Green Park', 'qty' => '28 tonnes', 'value' => '£22,400', 'expected' => '14 May 2026', 'actual' => '12 May 2026', 'status' => 'Early', 'delay' => -2, 'priority' => 'High'],
                    ['id' => 'PO-2026-0160', 'item' => 'PVC Windows (Triple Glazed)', 'supplier' => 'Deceuninck UK', 'project' => 'Bristol Harbour Bridge', 'qty' => '120 units', 'value' => '£84,000', 'expected' => '22 May 2026', 'actual' => '-', 'status' => 'Expected', 'delay' => 0, 'priority' => 'Medium'],
                    ['id' => 'PO-2026-0148', 'item' => 'Copper Pipe & Fittings', 'supplier' => 'Yorkshire Copper', 'project' => 'Newcastle Innovation Centre', 'qty' => '3,200m', 'value' => '£19,200', 'expected' => '16 May 2026', 'actual' => '16 May 2026', 'status' => 'On Time', 'delay' => 0, 'priority' => 'Low'],
                    ['id' => 'PO-2026-0165', 'item' => 'Pre-cast Concrete Stairs', 'supplier' => 'Brett Landscaping', 'project' => 'Birmingham Central Plaza', 'qty' => '24 units', 'value' => '£52,800', 'expected' => '20 May 2026', 'actual' => '28 May 2026', 'status' => 'Delayed', 'delay' => 8, 'priority' => 'Critical'],
                    ['id' => 'PO-2026-0170', 'item' => 'Insulation (PIR Board)', 'supplier' => 'Kingspan', 'project' => 'Manchester Metro Hub', 'qty' => '1,200 sqm', 'value' => '£18,000', 'expected' => '24 May 2026', 'actual' => '-', 'status' => 'Expected', 'delay' => 0, 'priority' => 'Medium'],
                ],
                'materials' => [
                    ['name' => 'Structural Steel', 'supplier' => 'British Steel', 'leadTime' => '4 weeks', 'ordered' => 85, 'delivered' => 62, 'unit' => 'tonnes', 'pricePerUnit' => 850],
                    ['name' => 'Concrete C40', 'supplier' => 'Hanson UK', 'leadTime' => '1 week', 'ordered' => 2400, 'delivered' => 2100, 'unit' => 'm3', 'pricePerUnit' => 95],
                    ['name' => 'Timber (CLT)', 'supplier' => 'Stora Enso', 'leadTime' => '6 weeks', 'ordered' => 320, 'delivered' => 180, 'unit' => 'm3', 'pricePerUnit' => 520],
                    ['name' => 'Facing Bricks', 'supplier' => 'Ibstock Brick', 'leadTime' => '3 weeks', 'ordered' => 45000, 'delivered' => 38000, 'unit' => 'bricks', 'pricePerUnit' => 0.42],
                ],
            ],
        ]);
    }
}
