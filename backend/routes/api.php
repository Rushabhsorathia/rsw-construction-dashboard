<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — RSW Construction Dashboard
| Laravel 11 auto-prefixes api.php with /api
|--------------------------------------------------------------------------
*/

// Auth
Route::post('/auth/login', [App\Http\Controllers\Api\AuthController::class, 'login']);
Route::post('/auth/logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);
Route::get('/auth/me', [App\Http\Controllers\Api\AuthController::class, 'me']);
Route::put('/auth/profile', [App\Http\Controllers\Api\AuthController::class, 'updateProfile']);
Route::put('/auth/password', [App\Http\Controllers\Api\AuthController::class, 'changePassword']);

// Projects
Route::get('/projects', [App\Http\Controllers\Api\ProjectController::class, 'index']);
Route::get('/projects/{id}', [App\Http\Controllers\Api\ProjectController::class, 'show']);

// Budget
Route::get('/budget', [App\Http\Controllers\Api\BudgetController::class, 'index']);

// Resources
Route::get('/resources', [App\Http\Controllers\Api\ResourceController::class, 'index']);

// Health & Safety
Route::get('/health-safety', [App\Http\Controllers\Api\HealthSafetyController::class, 'index']);

// Subcontractors
Route::get('/subcontractors', [App\Http\Controllers\Api\SubcontractorController::class, 'index']);

// Supply Chain
Route::get('/supply-chain', [App\Http\Controllers\Api\SupplyChainController::class, 'index']);

// Risk Register
Route::get('/risk-register', [App\Http\Controllers\Api\RiskRegisterController::class, 'index']);

// RFI Tracker
Route::get('/rfi', [App\Http\Controllers\Api\RFIController::class, 'index']);

// Daily Logs
Route::get('/daily-logs', [App\Http\Controllers\Api\DailyLogController::class, 'index']);

// Site Photos
Route::get('/site-photos', [App\Http\Controllers\Api\SitePhotoController::class, 'index']);

// Documents
Route::get('/documents', [App\Http\Controllers\Api\DocumentController::class, 'index']);

// Gantt Tasks
Route::get('/gantt-tasks', [App\Http\Controllers\Api\GanttTaskController::class, 'index']);

// AI Assistant
Route::post('/ai/chat', [App\Http\Controllers\Api\AIController::class, 'chat']);
