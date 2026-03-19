import React, {useState, useEffect, useMemo} from "react";
import {
	FileDown,
	User,
	Calendar,
	Edit,
	Trash,
	X,
	Menu,
	Search,
	ChevronLeft,
	ChevronRight,
	Plus,
	ExternalLink
} from "lucide-react";
import axios from "axios";
import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import AddHeadingForm from "@/AddFormComponent/AddHeadingForm";
import EditHeadingForm from "@/EditFormComponents/EditHeadingForm";
import MyTable from "@/MyTable/MyTable";

const Heading = () => {
	const [allHeadings, setAllHeadings] = useState([]);
	const [reloadTrigger, setReloadTrigger] = useState(false);
	const [editingHeading, setEditingHeading] = useState(null);
	const [showHeadingForm, setShowHeadingForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [allCategory, setAllCategory] = useState([]);
	const [dailyLimitError, setDailyLimitError] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const imgurl = import.meta.env.VITE_IMAGE_PATH;

	// Pagination state for MyTable
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	// Truncate text utility
	const truncateText = (text, maxLength) => {
		if (!text) 
			return "";
		
		return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
	};

	// Handle backdrop click to close modal
	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			setShowHeadingForm(false);
			setShowEditForm(false);
			setEditingHeading(null);
		}
	};

	// Fetch headings from API
	useEffect(() => {
		const fetchHeadings = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await axios.get(route("headings.index"));

				// Handle different possible response structures
				let headingsData = [];

				if (Array.isArray(response.data)) {
					headingsData = response.data;
				} else if (response.data && Array.isArray(response.data.data)) {
					headingsData = response.data.data;
				} else if (response.data && response.data.headings) {
					headingsData = response.data.headings;
				}

				setAllHeadings(headingsData);
				setCurrentPage(1); // Reset to first page
			} catch (error) {
				console.error("Error fetching headings:", error);
				setError("Failed to fetch headings. Please try again.");
				setAllHeadings([]);
			} finally {
				setIsLoading(false);
			}
		};
		fetchHeadings();

		const fetchCategories = async () => {
			try {
				const response = await axios.get(route("cate.index"));
				setAllCategory(Array.isArray(response.data.data) ? response.data.data : []);
			} catch (error) {
				console.error("Error fetching Category:", error);
				setAllCategory([]);
			}
		};
		fetchCategories();
	}, [reloadTrigger]);

	// Delete heading
	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this heading?")) 
			return;
		
		try {
			await axios.delete(route("headings.destroy", {id}));
			setReloadTrigger((prev) => !prev); // Trigger re-fetch
		} catch (error) {
			console.error("Delete error:", error);
			alert("Failed to delete the heading.");
		}
	};

	// Edit heading
	const handleEdit = (heading) => {
		setEditingHeading(heading);
		setShowEditForm(true);
	};

	// Update heading
	const handleUpdate = async (formData, id) => {
		try {
			formData.append("_method", "PUT");
			await axios.post(route("headings.update", {id}), formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
			setReloadTrigger((prev) => !prev);
			setShowEditForm(false);
			setEditingHeading(null);
		} catch (error) {
			console.error("Error updating heading:", error);
			throw error;
		}
	};

	// Handle form submission error from AddHeadingForm
	const handleFormSubmissionError = (error) => {
		if (error.response && error.response.status === 403) { // Close the form and show the daily limit error
			setShowHeadingForm(false);
			setDailyLimitError(true);
		} else { // Handle other errors
			console.error("Error creating heading:", error);
			alert("Failed to create the heading. Please try again.");
		}
	};

	// Filter headings based on search query
	const filteredHeadings = useMemo(() => {
		if (!searchQuery) 
			return allHeadings;
		

		return allHeadings.filter((item) => item.heading ?. toLowerCase().includes(searchQuery.toLowerCase()) || item.description ?. toLowerCase().includes(searchQuery.toLowerCase()));
	}, [allHeadings, searchQuery]);

	// Define table columns
	const columns = useMemo(() => [
		{
			Header: 'S.No',
			accessor: (row, index) => index + 1,
			id: 'sno',
			Cell: ({row}) => {
				const index = filteredHeadings.findIndex(h => h.id === row.original.id);
				return <span>{
					(currentPage - 1) * perPage + index + 1
				}</span>;
			}
		},
		{
			Header: 'Title',
			accessor: 'heading',
			Cell: ({value}) => (
				<div className="max-w-xs"
					title={value}>
					{
					truncateText(value, 50)
				} </div>
			)
		},
		{
			Header: 'Description',
			accessor: 'description',
			Cell: ({value}) => (
				<div className="max-w-md"
					title={value}>
					{
					truncateText(value, 70)
				} </div>
			)
		},
		{
			Header: 'Published Date',
			accessor: 'published_at',
			Cell: ({value}) => {
				const date = new Date(value);
				return date.toLocaleDateString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric"
				});
			}
		}, {
			Header: 'Image',
			accessor: 'image',
			Cell: ({value}) => (value ? (
				<img src={
						`${imgurl}/${value}`
					}
					alt="Banner"
					className="w-16 h-16 object-cover rounded-lg shadow-sm"
					onError={
						(e) => {
							e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
						}
					}/>
			) : (
				<span className="text-gray-400">No image</span>
			))
		}, {
			Header: 'Actions',
			accessor: 'actions',
			Cell: ({row}) => (
				<div className="flex items-center gap-2">
					<button onClick={
							() => handleEdit(row.original)
						}
						className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
						title="Edit heading">
						<Edit size={16}/>
					</button>
					<button onClick={
							() => handleDelete(row.original.id)
						}
						className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
						title="Delete heading">
						<Trash size={16}/>
					</button>
				</div>
			)
		},
	], [filteredHeadings, currentPage, perPage]);

	// Calculate pagination
	const pagination = useMemo(() => ({
		currentPage,
		lastPage: Math.ceil(filteredHeadings.length / perPage),
		perPage,
		onPageChange: (page) => setCurrentPage(page),
		onPerPageChange: (size) => {
			setPerPage(size);
			setCurrentPage(1); // Reset to first page when changing items per page
		}
	}), [currentPage, perPage, filteredHeadings.length]);

	// Get current page data
	const currentData = useMemo(() => {
		const start = (currentPage - 1) * perPage;
		const end = start + perPage;
		return filteredHeadings.slice(start, end);
	}, [filteredHeadings, currentPage, perPage]);

	return (
		<AdminWrapper>
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="flex flex-wrap items-center justify-between mb-8">
					<div className="flex items-center gap-4">
						<h1 className="text-2xl md:text-3xl font-bold text-gray-800">
							Heading Management
						</h1>
						<span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
							Total: {
							filteredHeadings.length
						} </span>
					</div>

					<div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
						{/* Search Input */}
						<div className="relative">
							<input type="text" placeholder="Search headings..."
								value={searchQuery}
								onChange={
									(e) => {
										setSearchQuery(e.target.value);
										setCurrentPage(1); // Reset to first page on search
									}
								}
								className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-full md:w-64"/>
							<Search className="absolute left-3 top-2.5 text-gray-400"
								size={18}/>
						</div>

						<button onClick={
								() => {
									setEditingHeading(null);
									setShowHeadingForm(true);
								}
							}
							className="py-2 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center gap-2">
							<Plus size={18}/>
							<span>Add Heading</span>
						</button>
					</div>
				</div>

				{/* Daily Limit Error Modal */}
				{
				dailyLimitError && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
						<div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-xl font-bold text-gray-800">
									Daily Limit Reached
								</h3>
								<button onClick={
										() => setDailyLimitError(false)
									}
									className="text-gray-500 hover:text-gray-700">
									<X size={24}/>
								</button>
							</div>
							<p className="text-gray-600 mb-6">
								News can only be added once per day. Please
								                                return tomorrow to add another.
							</p>
							<div className="flex justify-end">
								<button onClick={
										() => setDailyLimitError(false)
									}
									className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg">
									OK
								</button>
							</div>
						</div>
					</div>
				)
			}

				{/* Add Heading Form Modal */}
				{
				showHeadingForm && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
						onClick={handleBackdropClick}>
						<div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
							<AddHeadingForm showHeadingForm={showHeadingForm}
								setShowHeadingForm={setShowHeadingForm}
								reloadTrigger={reloadTrigger}
								setReloadTrigger={setReloadTrigger}
								onError={handleFormSubmissionError}
								setAllCategory={setAllCategory}
								allCategory={allCategory}/>
						</div>
					</div>
				)
			}

				{/* Edit Heading Form Modal */}
				{
				showEditForm && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
						onClick={handleBackdropClick}>
						<div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
							<EditHeadingForm showHeadingForm={showEditForm}
								setShowHeadingForm={setShowEditForm}
								editingHeading={editingHeading}
								setEditingHeading={setEditingHeading}
								handleUpdate={handleUpdate}
								setAllCategory={setAllCategory}
								allCategory={allCategory}/>
						</div>
					</div>
				)
			}

				{/* Loading State */}
				{
				isLoading && (
					<div className="flex justify-center items-center h-64">
						<div className="text-center">
							<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
							<p className="mt-2 text-gray-600">Loading headings...</p>
						</div>
					</div>
				)
			}

				{/* Error State */}
				{
				error && !isLoading && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
						<strong className="font-bold">Error:
						</strong>
						<span className="block sm:inline">
							{error}</span>
					</div>
				)
			}

				{/* Table */}
				{
				!isLoading && !error && (
					<> {
						filteredHeadings.length > 0 ? (
							<MyTable columns={columns}
								data={currentData}
								pagination={pagination}/>
						) : (
							<div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
								<p className="text-gray-500 mb-4">
									{
									searchQuery ? "No headings match your search." : "No headings found."
								} </p>
								{
								!searchQuery && (
									<button onClick={
											() => {
												setEditingHeading(null);
												setShowHeadingForm(true);
											}
										}
										className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
										Add Your First Heading
									</button>
								)
							} </div>
						)
					} </>
				)
			} </div>
		</AdminWrapper>
	);
};

export default Heading;
