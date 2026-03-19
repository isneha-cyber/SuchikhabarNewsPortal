import AddBannerForm from "@/AddFormComponent/AddBannerForm";
import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import EditBannerForm from "@/EditFormComponents/EditBannerForm";
import MyTable from "@/MyTable/MyTable";
import axios from "axios";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";



const Banners = () => {
    const [allbanner, setAllBanner] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);
    const [loading, setLoading] = useState(true);
    const imgurl = import.meta.env.VITE_IMAGE_PATH;
    
    // Pagination state for MyTable
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

   useEffect(() => {
    const fetchBanner = async () => {
        try {
            setLoading(true);
            // console.log("Fetching banners...");
            const response = await axios.get(route("banner.index"));
            // console.log("API Response:", response.data);

            let data = [];
            if (response.data && response.data.data) {
                data = response.data.data;
            } else {
                data = response.data || [];
            }

            // Sort latest first
            const sorted = [...data].sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
                // Or if using id: return b.id - a.id;
            });

            setAllBanner(sorted);
        } catch (error) {
            console.error("Error fetching banners:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
            setAllBanner([]);
        } finally {
            setLoading(false);
        }
    };
    fetchBanner();
}, [reloadTrigger]);

// console.log(allbanner);

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this banner?"))
            return;

        try {
            await axios.delete(route("banner.destroy", { id }));
            setReloadTrigger((prev) => !prev); // Trigger re-fetch
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // Handle update
    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            await axios.post(route("banner.update", { id }), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Error updating banner:", error);
            throw error;
        }
    };

    // Open edit form
    const handleEdit = (banner) => {
        setEditingBanner(banner);
        setShowEditForm(true);
    };

    // Close edit form
    const handleCloseEdit = () => {
        setEditingBanner(null);
        setShowEditForm(false);
    };

    // Define table columns
    const columns = useMemo(() => [
        {
                Header: "SN",
                accessor: (row, i) => i + 1,
                id: "rowIndex",
                width: 60,
            },
        {
            Header: 'Image',
            accessor: 'image',
            Cell: ({ value }) => (
                <div className="flex items-center">
                    <img 
                        src={`${imgurl}/${value}`}
                        alt="Banner" 
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                        }}
                    />
                 

                </div>
            ),
        },
        {
            Header: 'Category',
            accessor: 'category',
            Cell: ({ value }) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    value?.toLowerCase() === 'rectangle' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                }`}>
                    {value || 'N/A'}
                </span>
            ),
        },
        {
            Header: 'Link',
            accessor: 'link',
            Cell: ({ value }) => (
                value ? (
                    <a 
                        href={value} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        View Link <ExternalLink size={14} />
                    </a>
                ) : (
                    <span className="text-gray-400">No link</span>
                )
            ),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleEdit(row.original)}
                        className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Edit banner"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original.id)}
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete banner"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ], []);

    // Calculate pagination
    const pagination = useMemo(() => ({
        currentPage,
        lastPage: Math.ceil(allbanner.length / perPage),
        perPage,
        onPageChange: (page) => setCurrentPage(page),
        onPerPageChange: (size) => {
            setPerPage(size);
            setCurrentPage(1); // Reset to first page when changing items per page
        },
    }), [currentPage, perPage, allbanner.length]);

    // Get current page data
    const currentData = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        return allbanner.slice(start, end);
    }, [allbanner, currentPage, perPage]);

    if (loading) {
        return (
            <AdminWrapper>
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500">Loading banners...</div>
                </div>
            </AdminWrapper>
        );
    }

    return (
        <AdminWrapper>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between mb-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Banners Management
                        </h1>
                        <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            Total: {allbanner.length}
                        </span>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                    >
                        <span>Add New Banner</span>
                    </button>
                </div>

                {/* Table */}
                {allbanner.length > 0 ? (
                    <MyTable
                        columns={columns}
                        data={currentData}
                        pagination={pagination}
                    />
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">No banners found.</p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Add Your First Banner
                        </button>
                    </div>
                )}

                {/* Add Form Modal */}
                {showAddForm && (
                    <AddBannerForm
                        showForm={showAddForm}
                        setShowForm={setShowAddForm}
                        reloadTrigger={reloadTrigger}
                        setReloadTrigger={setReloadTrigger}
                        maxImageSizeMb={10}
                    />
                )}

                {/* Edit Form Modal */}
                {showEditForm && (
                    <EditBannerForm
                        showForm={showEditForm}
                        setShowForm={setShowEditForm}
                        editingBanner={editingBanner}
                        handleUpdate={handleUpdate}
                        handleClose={handleCloseEdit}
                        reloadTrigger={reloadTrigger}
                        setReloadTrigger={setReloadTrigger}
                        maxImageSizeMb={10}
                    />
                )}
            </div>
        </AdminWrapper>
    );
};

export default Banners;
