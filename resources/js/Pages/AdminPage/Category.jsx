import React, { useEffect, useState, useMemo } from "react";
import { Edit, Plus, Trash } from "lucide-react";
import axios from "axios";

import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import AddCategoryForm from "@/AddFormComponent/AddCategoryForm";
import EditCategoryForm from "@/EditFormComponents/EditCategoryForm";
import MyTable from "@/MyTable/MyTable";

const Category = () => {
    const [allCategory, setAllCategory] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Start from 1 for MyTable
    const [perPage, setPerPage] = useState(15);

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const response = await axios.get(route("cate.index"));
                setAllCategory(response.data.data || []);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching category:", error);
                setAllCategory([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [reloadTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?"))
            return;
        try {
            await axios.delete(route("cate.destroy", { id }));
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting category. Please try again.");
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowEditForm(true);
    };

    // Calculate pagination
    const offset = (currentPage - 1) * perPage;
    const currentCategories = allCategory.slice(offset, offset + perPage);
    const lastPage = Math.ceil(allCategory.length / perPage);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle per page change
    const handlePerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    // Define table columns
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: (row, index) => offset + index + 1,
                id: "id"
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEdit(row.original)}
                            className="text-blue-600 hover:text-blue-900 flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
                            aria-label={`Edit category ${row.original.name}`}
                        >
                            <Edit size={14} className="mr-1" />
                            <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="text-red-600 hover:text-red-900 flex items-center px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                            aria-label={`Delete category ${row.original.name}`}
                        >
                            <Trash size={14} className="mr-1" />
                            <span className="hidden sm:inline">Delete</span>
                        </button>
                    </div>
                ),
            },
        ],
        [offset] // Recalculate when offset changes
    );

    return (
        <AdminWrapper>
            <div className="">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Category Management
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                    >
                        <Plus size={18} className="hidden md:block" />
                        <span>Add Category</span>
                    </button>
                </div>

                {/* Add Category Form Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                            <AddCategoryForm
                                showForm={showAddForm}
                                setShowForm={setShowAddForm}
                                setReloadTrigger={setReloadTrigger}
                            />
                        </div>
                    </div>
                )}

                {/* Edit Category Form Modal */}
                {showEditForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                            <EditCategoryForm
                                showForm={showEditForm}
                                setShowForm={setShowEditForm}
                                editingCategory={editingCategory}
                                setEditingCategory={setEditingCategory}
                                setReloadTrigger={setReloadTrigger}
                            />
                        </div>
                    </div>
                )}

                {/* MyTable Component */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
                        Loading categories...
                    </div>
                ) : (
                    <MyTable
                        columns={columns}
                        data={currentCategories}
                        pagination={{
                            currentPage,
                            lastPage,
                            perPage,
                            onPageChange: handlePageChange,
                            onPerPageChange: handlePerPageChange
                        }}
                    />
                )}
            </div>
        </AdminWrapper>
    );
};

export default Category;