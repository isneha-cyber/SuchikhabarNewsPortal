<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Format user data with proper image URL
     */
    private function formatUserWithImageUrl($user)
    {
        if ($user->image) {
            // Check if it's already a full URL
            if (filter_var($user->image, FILTER_VALIDATE_URL)) {
                $user->image_url = $user->image;
            } else {
                // Generate full URL for storage path
                $user->image_url = asset('storage/' . $user->image);
            }
        } else {
            $user->image_url = null;
        }
        
        return $user;
    }

    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::all();
        
        // Format each user with image URL
        $users->transform(function ($user) {
            return $this->formatUserWithImageUrl($user);
        });
        
        return response()->json($users);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('users', 'public');
        }

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'image'    => $imagePath,
        ]);

        // Log creation
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Created new user (ID: ' . $user->id . ')',
        ]);

        // Format user with image URL
        $user = $this->formatUserWithImageUrl($user);

        return response()->json([
            'message' => 'User created successfully',
            'user'    => $user,
        ], 201);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name'     => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:6|nullable',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle image update
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }
            $validated['image'] = $request->file('image')->store('users', 'public');
        }

        // Hash password if updating
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        // Log update
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Updated user (ID: ' . $user->id . ')',
        ]);

        // Format user with image URL
        $user = $this->formatUserWithImageUrl($user);

        return response()->json([
            'message' => 'User updated successfully',
            'user'    => $user,
        ]);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Delete user image if exists
        if ($user->image && Storage::disk('public')->exists($user->image)) {
            Storage::disk('public')->delete($user->image);
        }

        $user->delete();

        // Log deletion
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => request()->ip(),
            'title' => 'Deleted user (ID: ' . $id . ')',
        ]);

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }

    /**
     * Display the specified user.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        $user = $this->formatUserWithImageUrl($user);
        return response()->json($user);
    }
}