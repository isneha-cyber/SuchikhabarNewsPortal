import AddTeamForm from "@/AddFormComponent/AddTeamForm";
import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import EditTeamForm from "@/EditFormComponents/EditTeamForm";
import axios from "axios";
import { Edit, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

const Teams = () => {
    const [allTeams, setAllTeams] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingTeam, setEditingTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [error, setError] = useState(null);

    // Fetch teams from API
    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            setError(null);
            try {
                // Get the full URL from route helper
                const url = route("team.index");
                // console.log("Fetching from URL:", url);
                
                const response = await axios.get(url);
                // console.log("Full API Response:", response);
                // console.log("Response Data:", response.data);

                // Handle different response formats
                let teams = [];
                
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    // Format: { success: true, data: [...] }
                    teams = response.data.data;
                } else if (Array.isArray(response.data)) {
                    // Format: direct array
                    teams = response.data;
                } else if (response.data && Array.isArray(response.data.teams)) {
                    // Format: { teams: [...] }
                    teams = response.data.teams;
                } else if (response.data && typeof response.data === 'object') {
                    // Try to find any array property in the response
                    const possibleArray = Object.values(response.data).find(val => Array.isArray(val));
                    if (possibleArray) {
                        teams = possibleArray;
                    } else {
                        // If it's a single object, wrap it in an array
                        teams = [response.data];
                    }
                }

                // console.log("Processed teams:", teams);
                setAllTeams(teams);
                
                if (teams.length === 0) {
                    console.log("No teams found in the response");
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
                setError(error.message);
                setAllTeams([]);
                
                // Show more detailed error message
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // console.error("Error response data:", error.response.data);
                    // console.error("Error response status:", error.response.status);
                    // console.error("Error response headers:", error.response.headers);
                    
                    alert(`Failed to load team members: Server error (${error.response.status})`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("Error request:", error.request);
                    alert("Failed to load team members: No response from server");
                } else {
                    // Something happened in setting up the request
                    alert(`Failed to load team members: ${error.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [reloadTrigger]);

    // Handle delete with loading state
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this team member?")) {
            return;
        }

        setActionLoading(id);
        try {
            const url = route("team.destroy", { id });
            console.log("Delete URL:", url);
            
            await axios.delete(url);
            console.log("Delete successful");
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Delete error:", error);
            
            let errorMessage = "Failed to delete team member.";
            if (error.response) {
                errorMessage += ` Server error (${error.response.status})`;
                console.error("Delete error details:", error.response.data);
            } else if (error.request) {
                errorMessage += " No response from server";
            } else {
                errorMessage += ` ${error.message}`;
            }
            
            alert(errorMessage);
        } finally {
            setActionLoading(null);
        }
    };

    // Open edit form
    const handleEdit = (team) => {
        setEditingTeam(team);
        setShowEditForm(true);
    };

    return (
        <AdminWrapper>
            <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Teams
                    </h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                    >
                        <Plus size={18} />
                        <span>Add Team Member</span>
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">Error: {error}</p>
                        <p className="text-sm text-red-500 mt-1">
                            Check browser console and Laravel logs for more details.
                        </p>
                    </div>
                )}

                {/* Add Form Modal */}
                {showAddForm && (
                    <AddTeamForm
                        showForm={showAddForm}
                        setShowForm={setShowAddForm}
                        setReloadTrigger={setReloadTrigger}
                    />
                )}

                {/* Edit Form Modal */}
                {showEditForm && (
                    <EditTeamForm
                        showForm={showEditForm}
                        setShowForm={setShowEditForm}
                        editingTeam={editingTeam}
                        setEditingTeam={setEditingTeam}
                        setReloadTrigger={setReloadTrigger}
                    />
                )}

                {/* Teams Display */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-2"></div>
                            <p className="text-gray-500">Loading team members...</p>
                        </div>
                    ) : allTeams.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 mb-2">No team members found.</p>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="text-red-600 hover:text-red-700 font-medium"
                            >
                                Add your first team member
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Mobile View */}
                            <div className="block lg:hidden">
                                {allTeams.map((team, index) => (
                                    <div
                                        key={team.id || index}
                                        className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium text-gray-900">
                                                {team.name || 'N/A'}
                                            </h3>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                #{index + 1}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">
                                            {team.designation || 'N/A'}
                                        </p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEdit(team)}
                                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                                disabled={actionLoading === team.id}
                                            >
                                                <Edit size={14} />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(team.id)}
                                                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                                                disabled={actionLoading === team.id}
                                            >
                                                {actionLoading === team.id ? (
                                                    <>
                                                        <span className="animate-spin">⌛</span>
                                                        <span>Deleting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash size={14} />
                                                        <span>Delete</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop View */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                S.No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Designation
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allTeams.map((team, index) => (
                                            <tr
                                                key={team.id || index}
                                                className="hover:bg-gray-50 transition duration-150 ease-in-out"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {team.name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {team.designation || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleEdit(team)}
                                                            className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                                                            disabled={actionLoading === team.id}
                                                        >
                                                            <Edit size={14} />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(team.id)}
                                                            className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                                                            disabled={actionLoading === team.id}
                                                        >
                                                            {actionLoading === team.id ? (
                                                                <span className="animate-spin">⌛</span>
                                                            ) : (
                                                                <Trash size={14} />
                                                            )}
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AdminWrapper>
    );
};

export default Teams;