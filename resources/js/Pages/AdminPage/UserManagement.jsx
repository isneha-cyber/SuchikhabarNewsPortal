import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, Users, Mail } from "lucide-react";
import axios from "axios";
import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import AddUserForm from "@/AddFormComponent/AddUserForm";
import EditUserForm from "@/EditFormComponents/EditUserForm";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(route("users.index"));
                setUsers(response.data);
            } catch (error) {
                console.error("Fetching error", error);
            }
        };
        fetchUsers();
    }, [reloadTrigger]);

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this team member? Deleting user means they won't be able to log in."
            )
        )
            return;
        try {
            await axios.delete(route("users.destroy", { id: id }));
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.log("Delete error", error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowEditForm(true);
    };

    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            const response = await axios.post(
                route("users.update", { id }),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setReloadTrigger((prev) => !prev);
            return response.data;
        } catch (error) {
            console.log("Error updating user", error);
            throw error;
        }
    };

    // Handle image error fallback
    const handleImageError = (e) => {
        e.target.style.display = 'none'; // Hide the broken image
        // Show the initials avatar fallback
        const parent = e.target.parentNode;
        const initialsDiv = document.createElement('div');
        initialsDiv.className = 'w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow ring-4 ring-white';
        
        // Get the user data from the parent component
        const userCard = e.target.closest('[data-user-id]');
        if (userCard) {
            const userId = userCard.getAttribute('data-user-id');
            const user = users.find(u => u.id === parseInt(userId));
            if (user) {
                initialsDiv.style.backgroundColor = getAvatarColor(user.name);
                initialsDiv.textContent = getInitials(user.name);
                parent.appendChild(initialsDiv);
            }
        }
    };

    // --- Generate Initials: First letter of first + last name ---
    const getInitials = (name) => {
        const n = name?.trim() || "";
        const parts = n.split(" ").filter(Boolean);

        if (parts.length === 0) return "?";
        const first = parts[0][0].toUpperCase();

        if (parts.length > 1) {
            const last = parts[parts.length - 1][0].toUpperCase();
            return `${first}${last}`;
        }

        return first;
    };

    // --- Generate consistent color based on name ---
    const getAvatarColor = (name) => {
        const n = name || "";
        let hash = 0;
        for (let i = 0; i < n.length; i++) {
            hash = n.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = hash % 360;
        return `hsl(${hue}, 60%, 70%)`;
    };

    return (
        <AdminWrapper>
            <div className="">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                        <div className="flex items-center">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                               User Management
                            </h1>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                        >
                            <Plus size={18} className="hidden md:block" />
                            <span>Add New User</span>
                        </button>
                    </div>

                    {/* Modals */}
                    {showAddForm && (
                        <AddUserForm
                            setShowUserForm={setShowAddForm}
                            setReloadTrigger={setReloadTrigger}
                        />
                    )}

                    {showEditForm && (
                        <EditUserForm
                            editingUser={editingUser}
                            setEditingUser={setEditingUser}
                            setShowUserForm={setShowEditForm}
                            handleUpdate={handleUpdate}
                        />
                    )}

                    {/* Users Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                data-user-id={user.id}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-5 border border-white/20 transition-transform duration-200 hover:shadow-lg"
                            >
                                <div className="flex flex-col items-center text-center mb-5">
                                    {/* Avatar */}
                                    <div className="relative mb-3">
                                        {user.image_url ? (
                                            <img 
                                                src={user.image_url}
                                                alt={user.name}
                                                onError={handleImageError}
                                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow"
                                            />
                                        ) : (
                                            <div
                                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow ring-4 ring-white"
                                                style={{
                                                    backgroundColor:
                                                        getAvatarColor(
                                                            user.name
                                                        ),
                                                }}
                                            >
                                                {getInitials(user.name)}
                                            </div>
                                        )}
                                    </div>

                                    {/* User Info */}
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate w-full">
                                        {user.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                        <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[180px]">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-center gap-2 sm:gap-3">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="p-2 sm:p-3 rounded-xl bg-blue-100 text-blue-600 shadow hover:bg-blue-200 transition"
                                        title="Edit User"
                                    >
                                        <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="p-2 sm:p-3 rounded-xl bg-red-100 text-red-600 shadow hover:bg-red-200 transition"
                                        title="Delete User"
                                    >
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminWrapper>
    );
};

export default UserManagement;