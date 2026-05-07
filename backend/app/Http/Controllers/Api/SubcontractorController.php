<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class SubcontractorController extends Controller
{
    public function index(): JsonResponse
    {
        $data = [
            [
                'id' => 1,
                'name' => 'SteelCore Fabrications Ltd',
                'trade' => 'Steel Work',
                'rating' => 4.5,
                'status' => 'Preferred',
                'value' => '£1.8M',
                'defectRate' => 2.1,
                'avgResponse' => 4,
                'cscsCompliant' => true,
                'performance' => [78, 82, 85, 90, 88],
                'projects' => ['Battersea Phase 2', 'Birmingham Central Plaza'],
                'contacts' => [
                    ['name' => 'Mark Hughes', 'phone' => '+44 7700 111222', 'email' => 'mark@steelcore.co.uk'],
                    ['name' => 'Lisa Chen', 'phone' => '+44 7700 111223', 'email' => 'lisa@steelcore.co.uk'],
                ],
            ],
            [
                'id' => 2,
                'name' => 'Apex Scaffolding Services',
                'trade' => 'Scaffolding',
                'rating' => 4.8,
                'status' => 'Preferred',
                'value' => '£2.1M',
                'defectRate' => 1.3,
                'avgResponse' => 2,
                'cscsCompliant' => true,
                'performance' => [85, 88, 92, 90, 95],
                'projects' => ['Battersea Phase 2', 'Manchester Metro Hub', 'Bristol Harbour Bridge'],
                'contacts' => [
                    ['name' => 'Dave Turner', 'phone' => '+44 7700 333444', 'email' => 'dave@apexscaff.co.uk'],
                ],
            ],
            [
                'id' => 3,
                'name' => 'Brickforce Construction',
                'trade' => 'Brickwork',
                'rating' => 4.2,
                'status' => 'Approved',
                'value' => '£3.4M',
                'defectRate' => 3.8,
                'avgResponse' => 6,
                'cscsCompliant' => true,
                'performance' => [70, 75, 78, 82, 80],
                'projects' => ['Manchester Metro Hub', 'Leeds Green Park'],
                'contacts' => [
                    ['name' => 'John Clarke', 'phone' => '+44 7700 555666', 'email' => 'john@brickforce.co.uk'],
                ],
            ],
            [
                'id' => 4,
                'name' => 'ElectraME Solutions',
                'trade' => 'M&E',
                'rating' => 4.7,
                'status' => 'Preferred',
                'value' => '£4.2M',
                'defectRate' => 1.8,
                'avgResponse' => 3,
                'cscsCompliant' => true,
                'performance' => [80, 85, 88, 92, 94],
                'projects' => ['Battersea Phase 2', 'Birmingham Central Plaza', 'Bristol Harbour Bridge', 'Newcastle Innovation Centre'],
                'contacts' => [
                    ['name' => 'Sarah Bennett', 'phone' => '+44 7700 777888', 'email' => 'sarah@electrame.co.uk'],
                ],
            ],
            [
                'id' => 5,
                'name' => 'Premier Roofing Co',
                'trade' => 'Roofing',
                'rating' => 3.9,
                'status' => 'On Notice',
                'value' => '£0.8M',
                'defectRate' => 7.2,
                'avgResponse' => 12,
                'cscsCompliant' => true,
                'performance' => [65, 60, 55, 58, 52],
                'projects' => ['Leeds Green Park'],
                'contacts' => [
                    ['name' => 'Mike Walsh', 'phone' => '+44 7700 999000', 'email' => 'mike@premierroof.co.uk'],
                ],
            ],
            [
                'id' => 6,
                'name' => 'GreenBuild Plastering',
                'trade' => 'Plastering',
                'rating' => 4.4,
                'status' => 'Approved',
                'value' => '£1.5M',
                'defectRate' => 2.9,
                'avgResponse' => 5,
                'cscsCompliant' => true,
                'performance' => [72, 78, 80, 82, 85],
                'projects' => ['Birmingham Central Plaza', 'Newcastle Innovation Centre'],
                'contacts' => [
                    ['name' => 'Tom Richards', 'phone' => '+44 7700 112233', 'email' => 'tom@greenbuild.co.uk'],
                ],
            ],
            [
                'id' => 7,
                'name' => 'FinishLine Painters',
                'trade' => 'Painting & Decorating',
                'rating' => 4.1,
                'status' => 'Approved',
                'value' => '£0.9M',
                'defectRate' => 3.5,
                'avgResponse' => 8,
                'cscsCompliant' => true,
                'performance' => [68, 72, 75, 78, 76],
                'projects' => ['Manchester Metro Hub', 'Birmingham Central Plaza', 'Leeds Green Park'],
                'contacts' => [
                    ['name' => 'Chris Evans', 'phone' => '+44 7700 445566', 'email' => 'chris@finishline.co.uk'],
                ],
            ],
            [
                'id' => 8,
                'name' => 'GroundForce Foundations',
                'trade' => 'Groundworks',
                'rating' => 4.6,
                'status' => 'Preferred',
                'value' => '£2.8M',
                'defectRate' => 1.5,
                'avgResponse' => 3,
                'cscsCompliant' => true,
                'performance' => [82, 85, 88, 90, 92],
                'projects' => ['Newcastle Innovation Centre'],
                'contacts' => [
                    ['name' => 'Paul Anderson', 'phone' => '+44 7700 778899', 'email' => 'paul@groundforce.co.uk'],
                ],
            ],
        ];

        return response()->json(['data' => $data]);
    }
}
