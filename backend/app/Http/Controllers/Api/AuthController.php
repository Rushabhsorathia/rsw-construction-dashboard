<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * Auth Controller — RSW Construction Dashboard
 *
 * TODO: Replace mock responses with real User model + Sanctum tokens
 * when database migrations and seeders are ready.
 */
class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // TODO: Real auth — check user exists, verify password, create Sanctum token
        // For now, accept any valid email/password and return mock user
        $name = Str::before($request->email, '@');
        $name = Str::headline($name);
        $initials = collect(explode(' ', $name))->map(fn($w) => Str::upper(Str::substr($w, 0, 1)))->take(2)->implode('');

        return response()->json([
            'data' => [
                'user' => [
                    'id' => 1,
                    'name' => $name,
                    'email' => $request->email,
                    'role' => 'Project Manager',
                    'initials' => $initials ?: 'U',
                    'phone' => '+44 7700 900000',
                    'company' => 'RainStreamWeb',
                    'job_title' => 'Project Manager',
                ],
                'token' => 'mock-sanctum-token-' . Str::random(40),
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        // TODO: Revoke Sanctum token — $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request): JsonResponse
    {
        // TODO: Return $request->user()
        return response()->json([
            'data' => [
                'id' => 1,
                'name' => 'Tom Mitchell',
                'email' => 'tom@rsw.co.uk',
                'role' => 'Project Manager',
                'initials' => 'TM',
                'phone' => '+44 7700 900000',
                'company' => 'RainStreamWeb',
                'job_title' => 'Project Manager',
            ],
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
        ]);

        // TODO: $request->user()->update($request->only([...]));
        return response()->json([
            'data' => array_merge([
                'id' => 1,
                'name' => 'Tom Mitchell',
                'email' => 'tom@rsw.co.uk',
                'role' => 'Project Manager',
                'initials' => 'TM',
                'phone' => '+44 7700 900000',
                'company' => 'RainStreamWeb',
                'job_title' => 'Project Manager',
            ], $request->only(['name', 'email', 'phone', 'company', 'job_title'])),
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // TODO: Verify current password, update with Hash::make()
        return response()->json(['message' => 'Password changed successfully']);
    }
}
