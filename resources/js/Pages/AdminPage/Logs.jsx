import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import MyTable from "@/MyTable/MyTable";

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(route("logs.index"));
                setLogs(Array.isArray(response.data) ? response.data : []);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching logs:", error);
                setError("Failed to fetch logs. Please try again later.");
                setLogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    // Define columns for the table
    const columns = useMemo(
        () => [
            {
                Header: "S.No",
                accessor: (row, index) => {
                    const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                    return globalIndex;
                },
                id: "serialNumber"
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "IP Address",
                accessor: "ip_address",
            },
            {
                Header: "Title",
                accessor: "title",
                Cell: ({ value }) => (
                    <span title={value}>
                        {value && value.length > 50 ? value.slice(0, 50) + "..." : value}
                    </span>
                ),
            },
        ],
        [currentPage, itemsPerPage]
    );

    // Pagination logic
    const paginatedLogs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return logs.slice(startIndex, endIndex);
    }, [logs, currentPage, itemsPerPage]);

    const lastPage = Math.ceil(logs.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage) => {
        setItemsPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const paginationConfig = {
        currentPage,
        lastPage,
        perPage: itemsPerPage,
        onPageChange: handlePageChange,
        onPerPageChange: handlePerPageChange,
    };

    return (
        <AdminWrapper>
            <div className="">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                    Logs
                </h2>

                {/* Loading state */}
                {loading && (
                    <div className="text-center py-8 sm:py-10">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            Loading logs...
                        </p>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
                        {error}
                    </div>
                )}

                {/* Table */}
                {!loading && !error && (
                    <MyTable
                        columns={columns}
                        data={paginatedLogs}
                        pagination={paginationConfig}
                    />
                )}
            </div>
        </AdminWrapper>
    );
};

export default Logs;