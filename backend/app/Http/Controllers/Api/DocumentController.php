<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class DocumentController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                ['name' => 'Architectural Drawing Rev. 4.2', 'type' => 'DWG', 'updated' => '26 Apr 2026', 'size' => '14.2 MB', 'by' => 'Arup & Partners', 'status' => 'Current'],
                ['name' => 'M&E Coordination Drawing', 'type' => 'PDF', 'updated' => '25 Apr 2026', 'size' => '8.7 MB', 'by' => 'Mott MacDonald', 'status' => 'Current'],
                ['name' => 'Structural Steel RFI #34 — Response', 'type' => 'PDF', 'updated' => '24 Apr 2026', 'size' => '1.3 MB', 'by' => 'Buro Happold', 'status' => 'Pending Review'],
                ['name' => 'Programme Update — Week 17', 'type' => 'XLSX', 'updated' => '23 Apr 2026', 'size' => '2.1 MB', 'by' => 'Project Team', 'status' => 'Current'],
                ['name' => 'CDM Pre-Construction Info Pack', 'type' => 'PDF', 'updated' => '22 Apr 2026', 'size' => '22.4 MB', 'by' => 'SafetyFirst Consultancy', 'status' => 'Current'],
            ],
        ]);
    }
}
