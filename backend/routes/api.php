<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — RSW Construction Dashboard
| Laravel 11 auto-prefixes api.php with /api
|--------------------------------------------------------------------------
*/

Route::get('/projects', [App\Http\Controllers\Api\ProjectController::class, 'index']);
Route::get('/projects/{id}', [App\Http\Controllers\Api\ProjectController::class, 'show']);
Route::get('/budget', [App\Http\Controllers\Api\BudgetController::class, 'index']);
Route::get('/resources', [App\Http\Controllers\Api\ResourceController::class, 'index']);
Route::get('/health-safety', [App\Http\Controllers\Api\HealthSafetyController::class, 'index']);
Route::get('/subcontractors', [App\Http\Controllers\Api\SubcontractorController::class, 'index']);
Route::get('/supply-chain', [App\Http\Controllers\Api\SupplyChainController::class, 'index']);
Route::get('/risk-register', [App\Http\Controllers\Api\RiskRegisterController::class, 'index']);
Route::get('/rfi', [App\Http\Controllers\Api\RFIController::class, 'index']);
Route::get('/daily-logs', [App\Http\Controllers\Api\DailyLogController::class, 'index']);
Route::get('/site-photos', [App\Http\Controllers\Api\SitePhotoController::class, 'index']);
Route::get('/documents', [App\Http\Controllers\Api\DocumentController::class, 'index']);
Route::post('/ai/chat', [App\Http\Controllers\Api\AIController::class, 'chat']);
