<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class SitePhotoController extends Controller
{
    public function index(): JsonResponse
    {
        $data = [
            [
                'id' => 1,
                'url' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
                'location' => 'Level 3 Slab Pour',
                'project' => 'Battersea Phase 2',
                'category' => 'Construction',
                'date' => '07 May 2026',
                'views' => 24,
                'author' => 'Tom Mitchell',
            ],
            [
                'id' => 2,
                'url' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
                'location' => 'Foundation Excavation',
                'project' => 'Manchester Metro Hub',
                'category' => 'Progress',
                'date' => '06 May 2026',
                'views' => 31,
                'author' => 'Sarah Chen',
            ],
            [
                'id' => 3,
                'url' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
                'location' => 'Bridge Deck Welding',
                'project' => 'Bristol Harbour Bridge',
                'category' => 'Technical',
                'date' => '05 May 2026',
                'views' => 45,
                'author' => 'James Wilson',
            ],
            [
                'id' => 4,
                'url' => 'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=600&h=400&fit=crop',
                'location' => 'Cladding Panel Install',
                'project' => 'Birmingham Central Plaza',
                'category' => 'Cladding',
                'date' => '03 May 2026',
                'views' => 38,
                'author' => 'Tom Mitchell',
            ],
            [
                'id' => 5,
                'url' => 'https://images.unsplash.com/photo-1590644365607-1c5e12459345?w=600&h=400&fit=crop',
                'location' => 'Landscaping Zone B',
                'project' => 'Leeds Green Park',
                'category' => 'Progress',
                'date' => '04 May 2026',
                'views' => 19,
                'author' => 'Emily Roberts',
            ],
            [
                'id' => 6,
                'url' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
                'location' => 'Steel Frame Erection',
                'project' => 'Newcastle Innovation Centre',
                'category' => 'Construction',
                'date' => '02 May 2026',
                'views' => 27,
                'author' => 'Sarah Chen',
            ],
            [
                'id' => 7,
                'url' => 'https://images.unsplash.com/photo-1509718446903-5cecd5f06865?w=600&h=400&fit=crop',
                'location' => 'M&E Ducting Run',
                'project' => 'Battersea Phase 2',
                'category' => 'M&E',
                'date' => '06 May 2026',
                'views' => 15,
                'author' => 'James Wilson',
            ],
            [
                'id' => 8,
                'url' => 'https://images.unsplash.com/photo-1519060941934-7f92b345ec86?w=600&h=400&fit=crop',
                'location' => 'Site Welfare Area',
                'project' => 'Manchester Metro Hub',
                'category' => 'Welfare',
                'date' => '05 May 2026',
                'views' => 12,
                'author' => 'Emily Roberts',
            ],
            [
                'id' => 9,
                'url' => 'https://images.unsplash.com/photo-1587578932405-7c740a761f2d?w=600&h=400&fit=crop',
                'location' => 'Tower Crane Operation',
                'project' => 'Birmingham Central Plaza',
                'category' => 'Site Setup',
                'date' => '04 May 2026',
                'views' => 33,
                'author' => 'Tom Mitchell',
            ],
            [
                'id' => 10,
                'url' => 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop',
                'location' => 'Core Wall Jump Lift',
                'project' => 'Birmingham Central Plaza',
                'category' => 'Construction',
                'date' => '07 May 2026',
                'views' => 41,
                'author' => 'Sarah Chen',
            ],
            [
                'id' => 11,
                'url' => 'https://images.unsplash.com/photo-1587577217800-4a169553a253?w=600&h=400&fit=crop',
                'location' => 'Piling Operations',
                'project' => 'Manchester Metro Hub',
                'category' => 'Technical',
                'date' => '07 May 2026',
                'views' => 22,
                'author' => 'James Wilson',
            ],
            [
                'id' => 12,
                'url' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
                'location' => 'Path Resin Binding',
                'project' => 'Leeds Green Park',
                'category' => 'Progress',
                'date' => '03 May 2026',
                'views' => 14,
                'author' => 'Emily Roberts',
            ],
        ];

        return response()->json(['data' => $data]);
    }
}
