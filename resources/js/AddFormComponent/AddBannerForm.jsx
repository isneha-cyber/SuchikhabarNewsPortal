import axios from "axios";
import React, {useState} from "react";
import {Camera, Upload, Hash} from "lucide-react";

const AddBannerForm = ({
	showForm,
	setShowForm,
	reloadTrigger,
	setReloadTrigger,
	maxImageSizeMb = 10
}) => {
	if (!showForm)
		return null;

	const [bannerForm, setBannerForm] = useState({image: null, link: "", category: "", priority: ""});
	const [imagePreview, setImagePreview] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errors, setErrors] = useState({});

	const handleCreate = async (formData) => {
    try {
        await axios.post(route("banner.store"), formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        setReloadTrigger((prev) => !prev);
    } catch (error) {
        console.error("Error creating banner", error);
        console.error("Validation errors:", error.response?.data); // ADD THIS
        throw error;
    }
};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		Object.keys(bannerForm).forEach((key) => {
			if (bannerForm[key] !== null && bannerForm[key] !== "") {
				formData.append(key, bannerForm[key]);
			}
		});

		try {
			setIsSubmitted(true);
			setErrors({});
			await handleCreate(formData);

			// Reset form and close modal
			setBannerForm({image: null, link: "", category: "", priority: ""});
			setImagePreview(null);
			setShowForm(false);
		} catch (error) {
			console.error("Error saving data", error);
			const serverErrors = error.response?.data?.errors || {};
			setErrors(serverErrors);
		} finally {
			setIsSubmitted(false);
		}
	};

	const handleChange = (e) => {
		const {name, value, type, files} = e.target;

		if (type === "file") {
			const file = files[0];

			// Check file size (MB -> bytes)
			const maxSize = maxImageSizeMb * 1024 * 1024;

			if (file && file.size > maxSize) {
				const message = `Image size must be less than ${maxImageSizeMb}MB.`;
				alert(message);
				setErrors((prev) => ({...prev, image: [message]}));
				e.target.value = null;
				return;
			}

			setBannerForm((prev) => ({
				...prev,
				[name]: file
			}));
			if (file) {
				setImagePreview(URL.createObjectURL(file));
			}
		} else {
			setBannerForm((prev) => ({
				...prev,
				[name]: value
			}));
		}
	};

	const handleClose = () => {
		setBannerForm({image: null, link: "", category: "", priority: ""});
		setImagePreview(null);
		setShowForm(false);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md max-h-screen overflow-y-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-gray-800">
						Add Banner
					</h1>
					<button onClick={handleClose}
						className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
						&times;
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">

					{/* Image Upload Field */}
					<div className="space-y-2">
						<label className="flex items-center text-lg font-semibold text-gray-700">
							<Camera className="mr-3 text-green-500" size={22}/>
							Banner Image
						</label>
						<div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-all duration-300 relative">
							{imagePreview ? (
								<div className="space-y-4">
									<img src={imagePreview} alt="Preview"
										className="mx-auto h-32 w-32 object-cover rounded-lg shadow-lg"/>
									<p className="text-sm text-gray-600">Click to change image</p>
								</div>
							) : (
								<div className="space-y-4">
									<Upload className="mx-auto h-12 w-12 text-gray-400"/>
									<p className="text-lg text-gray-600">Click to upload image</p>
								</div>
							)}
							<input type="file" name="image" accept="image/*"
								onChange={handleChange}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
						</div>
						{errors.image && (
							<p className="text-sm text-red-600">{errors.image[0]}</p>
						)}
					</div>

					{/* Category Selection */}
					<div>
						<label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
							Banner Category
						</label>
						<select id="category" name="category"
							value={bannerForm.category}
							onChange={handleChange}
							className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
							<option value="">Select a category</option>
							<option value="Rectangle">Rectangle</option>
							<option value="Square">Square</option>
						</select>
						{errors.category && (
							<p className="text-sm text-red-600 mt-1">{errors.category[0]}</p>
						)}
					</div>

					{/* Priority Input */}
					<div>
						<label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
							<Hash className="inline mr-1 text-indigo-500" size={15}/>
							Display Priority
						</label>
						<input type="number" id="priority" name="priority"
							min="1"
							value={bannerForm.priority}
							onChange={handleChange}
							placeholder="e.g. 1 = shown first, 2 = second"
							className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
						<p className="text-xs text-gray-400 mt-1">
							Lower number = shown first. Each banner should have a unique priority.
						</p>
						{errors.priority && (
							<p className="text-sm text-red-600 mt-1">{errors.priority[0]}</p>
						)}
					</div>

					{/* Link Input */}
					<div>
						<label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
							Link URL
						</label>
						<input type="url" id="link" name="link"
							value={bannerForm.link}
							onChange={handleChange}
							placeholder="https://example.com"
							className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
						{errors.link && (
							<p className="text-sm text-red-600 mt-1">{errors.link[0]}</p>
						)}
					</div>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-2 sm:space-y-0 sm:space-x-3 pt-4">
						<button type="submit"
							disabled={isSubmitted}
							className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">
							{isSubmitted ? "Submitting..." : "Submit"}
						</button>
						<button type="button"
							onClick={handleClose}
							className="flex-1 bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 focus:outline-none transition-colors">
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddBannerForm;
