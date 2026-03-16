<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TeamController extends Controller
{
    // Display all teams
    public function index()
    {
        try {
            $teams = Team::all();
            
            return response()->json([
                'success' => true,
                'data' => $teams,
                'message' => 'Teams retrieved successfully'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve teams',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Store a new team
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'designation' => 'required|string|max:255',
            ]);

            $team = Team::create([
                'name' => $request->name,
                'designation' => $request->designation
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Team member created successfully',
                'data' => $team
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create team member',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Update an existing team
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'designation' => 'sometimes|required|string|max:255',
            ]);

            $team = Team::findOrFail($id);
            
            $team->update([
                'name' => $request->name ?? $team->name,
                'designation' => $request->designation ?? $team->designation
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Team member updated successfully',
                'data' => $team
            ], 200);
            
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Team member not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update team member',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete a team
    public function destroy($id)
    {
        try {
            $team = Team::findOrFail($id);
            $team->delete();

            return response()->json([
                'success' => true,
                'message' => 'Team member deleted successfully'
            ], 200);
            
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Team member not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete team member',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}