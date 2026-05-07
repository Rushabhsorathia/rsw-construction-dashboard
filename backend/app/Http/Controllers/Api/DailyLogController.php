<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class DailyLogController extends Controller
{
    public function index(): JsonResponse
    {
        $data = [
            [
                'id' => 1,
                'date' => '07 May 2026',
                'project' => 'Battersea Phase 2',
                'weather' => 'Partly Cloudy',
                'temp' => 14,
                'wind' => '12 km/h SW',
                'workforce' => 87,
                'workHours' => 696,
                'photos' => 12,
                'accidentFree' => true,
                'submittedBy' => 'Tom Mitchell',
                'submittedAt' => '2 hours ago',
                'sections' => [
                    ['title' => 'Concrete Works', 'items' => 4, 'content' => 'Poured 120m3 of C40 concrete to Level 3 slab. Vibration compaction completed. Curing blankets applied to all new pours. Cube tests taken (6 cubes).'],
                    ['title' => 'Steel Fixing', 'items' => 3, 'content' => 'Level 4 rebar fixing 80% complete. Link bars and starter bars for columns. QA inspection passed for Level 3 steel.'],
                    ['title' => 'Mechanical & Electrical', 'items' => 2, 'content' => 'First fix conduit runs Level 2-3. MH ducting installed. Coordination meeting held with M&E subcontractor.'],
                    ['title' => 'Health & Safety', 'items' => 2, 'content' => 'Morning toolbox talk completed. Scaffold inspection carried out. All PPE compliance checked at gate.'],
                ],
            ],
            [
                'id' => 2,
                'date' => '06 May 2026',
                'project' => 'Manchester Metro Hub',
                'weather' => 'Sunny',
                'temp' => 16,
                'wind' => '8 km/h N',
                'workforce' => 64,
                'workHours' => 512,
                'photos' => 8,
                'accidentFree' => true,
                'submittedBy' => 'Sarah Chen',
                'submittedAt' => '1 day ago',
                'sections' => [
                    ['title' => 'Excavation', 'items' => 3, 'content' => 'Foundation excavation Phase 2 completed. 450m3 removed. Ground conditions as expected (sandstone).'],
                    ['title' => 'Piling', 'items' => 2, 'content' => '12 piles driven today (CFA). Total 48/72 complete. Pile integrity testing scheduled for Friday.'],
                    ['title' => 'Site Logistics', 'items' => 2, 'content' => 'New access road laid with Type 1. Material storage area expanded. Tower crane daily inspection passed.'],
                    ['title' => 'Environmental', 'items' => 1, 'content' => 'Noise monitoring within limits. Dust suppression active on haul roads. No complaints received.'],
                ],
            ],
            [
                'id' => 3,
                'date' => '05 May 2026',
                'project' => 'Bristol Harbour Bridge',
                'weather' => 'Light Rain',
                'temp' => 11,
                'wind' => '22 km/h W',
                'workforce' => 42,
                'workHours' => 336,
                'photos' => 6,
                'accidentFree' => false,
                'submittedBy' => 'James Wilson',
                'submittedAt' => '2 days ago',
                'sections' => [
                    ['title' => 'Bridge Deck', 'items' => 3, 'content' => 'Steel deck section 3 bolted. Welding inspection 100% pass rate. Anti-corrosion treatment applied to joints.'],
                    ['title' => 'Abutment Works', 'items' => 2, 'content' => 'Abutment B concrete pour delayed due to rain. Rebar cage assembled and ready. Tent cover erected.'],
                    ['title' => 'Incident Report', 'items' => 1, 'content' => 'Minor incident: slip on wet surface near abutment A. First aid administered on site. Worker returned to duties. Investigation underway.'],
                    ['title' => 'Quality Control', 'items' => 2, 'content' => 'Weld NDT testing 6 joints passed. Bolt torque checks completed. Material certificates filed.'],
                ],
            ],
            [
                'id' => 4,
                'date' => '04 May 2026',
                'project' => 'Leeds Green Park',
                'weather' => 'Cloudy',
                'temp' => 13,
                'wind' => '15 km/h NE',
                'workforce' => 38,
                'workHours' => 304,
                'photos' => 5,
                'accidentFree' => true,
                'submittedBy' => 'Emily Roberts',
                'submittedAt' => '3 days ago',
                'sections' => [
                    ['title' => 'Landscaping', 'items' => 3, 'content' => 'Topsoil spread Zones B-C. Tree planting 12/20 complete. Irrigation system 60% installed. Turf laying scheduled next week.'],
                    ['title' => 'Paths & Hardstanding', 'items' => 2, 'content' => 'Resin-bound path 45m laid. Drainage channels installed. Edging stones aligned and bedded.'],
                    ['title' => 'Playground Area', 'items' => 2, 'content' => 'Safety surfacing base compacted. Equipment foundations cast. Wet pour rubber surfacing ordered.'],
                    ['title' => 'Utilities', 'items' => 1, 'content' => 'LED lighting cable run 80% complete. Bench foundations cast. Water supply connection scheduled.'],
                ],
            ],
            [
                'id' => 5,
                'date' => '03 May 2026',
                'project' => 'Birmingham Central Plaza',
                'weather' => 'Sunny',
                'temp' => 18,
                'wind' => '6 km/h E',
                'workforce' => 95,
                'workHours' => 760,
                'photos' => 15,
                'accidentFree' => true,
                'submittedBy' => 'Tom Mitchell',
                'submittedAt' => '4 days ago',
                'sections' => [
                    ['title' => 'Core Construction', 'items' => 4, 'content' => 'Core walls Level 8-9 jump-lift completed. Concrete finish excellent. Lift shaft alignment verified.'],
                    ['title' => 'Curtain Wall', 'items' => 3, 'content' => 'Unit installation Level 3-4 (48 units). Gasket and seal checks passed. Weather testing 3 bays passed.'],
                    ['title' => 'Services Coordination', 'items' => 2, 'content' => 'BIM coordination meeting held. 12 clashes resolved. M&E penetration schedule updated.'],
                    ['title' => 'Programme', 'items' => 2, 'content' => 'Week 18 review: on programme. Critical path items identified. Resource ramp-up planned for Level 6+.'],
                ],
            ],
            [
                'id' => 6,
                'date' => '02 May 2026',
                'project' => 'Newcastle Innovation Centre',
                'weather' => 'Cloudy',
                'temp' => 12,
                'wind' => '18 km/h NW',
                'workforce' => 55,
                'workHours' => 440,
                'photos' => 9,
                'accidentFree' => true,
                'submittedBy' => 'Sarah Chen',
                'submittedAt' => '5 days ago',
                'sections' => [
                    ['title' => 'Steel Frame', 'items' => 3, 'content' => 'Steel erection Phase 2 complete (Bays 8-14). All bolt connections torque-checked. Fire protection spray 40% applied.'],
                    ['title' => 'Ground Floor Slab', 'items' => 2, 'content' => 'Power-float finish completed 600m2. Joints cut and cured. Moisture testing within specification.'],
                    ['title' => 'External Works', 'items' => 2, 'content' => 'Service trench excavation started. Drain connection to main sewer. Hardstanding base laid.'],
                    ['title' => 'Design Coordination', 'items' => 1, 'content' => 'Client design review meeting. Façade sample approved. Rooflight details agreed. No outstanding RFIs.'],
                ],
            ],
        ];

        return response()->json(['data' => $data]);
    }
}
