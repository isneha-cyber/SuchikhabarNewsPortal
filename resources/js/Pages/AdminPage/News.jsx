import React, { useState, useEffect, useMemo } from "react";
import {
   
    Edit,
    Trash,
    Plus,

} from "lucide-react";
import axios from "axios";
import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import AddNewsForm from "@/AddFormComponent/AddNewsForm";
import EditNewsForm from "@/EditFormComponents/EditNewsForm";
import MyTable from "@/MyTable/MyTable";

const News = () => {
    const [newsData, setNewsData] = useState({
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        page: 1,
        per_page: 10
    });
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [showNewsForm, setShowNewsForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [allCategory, setAllCategory] = useState([]);
    const [isMobileView, setIsMobileView] = useState(false);

    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Truncate text utility
    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    // Handle backdrop click to close modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowNewsForm(false);
            setShowEditForm(false);
            setEditingNews(null);
        }
    };

    // Fetch news from API with pagination
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await axios.get(route("news.index"), {
                    params: {
                        page: filters.page,
                        per_page: filters.per_page
                    }
                });
                
                console.log("API Response:", response.data);
                
                // Handle the paginated response structure
                if (response.data?.data) {
                    // Laravel pagination returns data in 'data' property
                    setNewsData({
                        data: response.data.data.data || response.data.data,
                        current_page: response.data.data.current_page || response.data.current_page,
                        last_page: response.data.data.last_page || response.data.last_page,
                        per_page: response.data.data.per_page || response.data.per_page,
                        total: response.data.data.total || response.data.total
                    });
                } else {
                    setNewsData({
                        data: [],
                        current_page: 1,
                        last_page: 1,
                        per_page: filters.per_page,
                        total: 0
                    });
                }
            } catch (error) {
                console.error("Error fetching news:", error);
                setNewsData({
                    data: [],
                    current_page: 1,
                    last_page: 1,
                    per_page: filters.per_page,
                    total: 0
                });
            } finally {
                setLoading(false);
            }
        };
        
        fetchNews();
        
        const fetchCategories = async () => {
            try {
                const response = await axios.get(route("cate.index"));
                setAllCategory(
                    Array.isArray(response.data.data) ? response.data.data : []
                );
            } catch (error) {
                console.error("Error fetching Category:", error);
                setAllCategory([]);
            }
        };
        fetchCategories();
    }, [reloadTrigger, filters.page, filters.per_page]);

    // Delete news
    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this news article?"
            )
        )
            return;
        try {
            await axios.delete(route("news.destroy", { id }));
            setReloadTrigger((prev) => !prev); // Trigger re-fetch
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete the article.");
        }
    };

    // Edit news
    const handleEdit = (news) => {
        setEditingNews(news);
        setShowEditForm(true);
    };

    // Update news
    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            await axios.post(route("news.update", { id }), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setReloadTrigger((prev) => !prev);
            setShowEditForm(false);
            setEditingNews(null);
        } catch (error) {
            console.error("Error updating news:", error);
            throw error;
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setFilters(prev => ({
            ...prev,
            page: newPage
        }));
    };

    // Handle per page change
    const handlePerPageChange = (newPerPage) => {
        setFilters(prev => ({
            ...prev,
            per_page: newPerPage,
            page: 1 // Reset to first page when changing items per page
        }));
    };

    // Define table columns
    const columns = useMemo(
        () => [
            {
                Header: "S.no",
                accessor: (row, index) => index + 1 + ((filters.page - 1) * filters.per_page),
                Cell: ({ row }) => <span>{row.index + 1 + ((filters.page - 1) * filters.per_page)}</span>,
            },
            {
                Header: "Heading",
                accessor: "heading",
                Cell: ({ value }) => (
                    <div className="max-w-xs" title={value}>
                        {truncateText(value, isMobileView ? 30 : 50)}
                    </div>
                ),
            },
            {
                Header: "Description",
                accessor: "description",
                Cell: ({ value }) => (
                    <div className="max-w-md" title={value}>
                        {truncateText(value, isMobileView ? 50 : 70)}
                    </div>
                ),
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: ({ row }) => (
                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                        <button
                            onClick={() => handleEdit(row.original)}
                            className="text-blue-600 hover:text-blue-900 flex items-center text-sm"
                        >
                            <Edit size={14} className="mr-1" />
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="text-red-600 hover:text-red-900 flex items-center text-sm"
                        >
                            <Trash size={14} className="mr-1" />
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        [isMobileView, filters.page, filters.per_page]
    );

    console.log("newsData", newsData); // Debug: check what data is being set

    return (
        <AdminWrapper>
            <div className="">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            News Management
                        </h1>
                        {newsData.total > 0 && (
                            <span className="ml-4 text-sm text-gray-500">
                                Total: {newsData.total} articles
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            setEditingNews(null);
                            setShowNewsForm(true);
                        }}
                        className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                    >
                        <Plus size={18} className="hidden md:block" />
                        <span>Add News</span>
                    </button>
                </div>

                {/* Add News Form Modal */}
                {showNewsForm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-2 md:p-4"
                        onClick={handleBackdropClick}
                    >
                        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
                            <AddNewsForm
                                showNewsForm={showNewsForm}
                                setShowNewsForm={setShowNewsForm}
                                reloadTrigger={reloadTrigger}
                                setReloadTrigger={setReloadTrigger}
                                setAllCategory={setAllCategory}
                                allCategory={allCategory}
                            />
                        </div>
                    </div>
                )}

                {/* Edit News Form Modal */}
                {showEditForm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-2 md:p-4"
                        onClick={handleBackdropClick}
                    >
                        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
                            <EditNewsForm
                                showNewsForm={showEditForm}
                                setShowNewsForm={setShowEditForm}
                                editingNews={editingNews}
                                setEditingNews={setEditingNews}
                                handleUpdate={handleUpdate}
                                setAllCategory={setAllCategory}
                                allCategory={allCategory}
                            />
                        </div>
                    </div>
                )}

                {/* News Table with Loading State */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500 mt-6">
                        Loading news articles...
                    </div>
                ) : newsData.data.length > 0 ? (
                    <MyTable 
                        columns={columns} 
                        data={newsData.data}
                        pagination={{
                            currentPage: newsData.current_page,
                            lastPage: newsData.last_page,
                            perPage: newsData.per_page,
                            total: newsData.total,
                            onPageChange: handlePageChange,
                            onPerPageChange: handlePerPageChange
                        }}
                    />
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500 mt-6">
                        No news articles found.
                    </div>
                )}
            </div>
        </AdminWrapper>
    );
};

export default News;