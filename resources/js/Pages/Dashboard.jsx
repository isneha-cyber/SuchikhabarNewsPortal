// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';

// export default function Dashboard() {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Dashboard
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">
//                             You're logged in!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }


import AdminWrapper from '@/AdminDashboard/AdminWrapper';
import {Link} from '@inertiajs/react';
import {ClipboardCheck, Hamburger, Image, Menu, Newspaper, Paperclip, Users} from 'lucide-react';
import React from 'react'

const Dashboard = () => {
	const cards = [
		{
			title: "News",
			breadcrumb: "Articles",
			icon: Newspaper,
			link: "/article"
		},
        {
			title: "Categories",
			breadcrumb: "Categories",
			icon: Menu,
			link: "/todocategories"
		},
        {
			title: "Headings",
			breadcrumb: "Headings",
			icon: Paperclip,
			link: "/heading"
		},
        {
			title: "Banners",
			breadcrumb: "Banners",
			icon: Image,
			link: "/banners"
		},
	];
	return (
		<AdminWrapper>
			<div className="max-w-7xl mx-auto py-4">
				<h2 className="text-2xl font-semibold text-gray-800 mb-10">
					Dashboard
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{
					cards.map((card, index) => {
						const Icon = card.icon;

						return (
							<Link key={index}
								href={
									card.link
								}
								className="block">
								<div className="bg-white rounded-2xl p-6 min-h-[180px] cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl">
									{/* Card Top Breadcrumb */}
									<div className="flex items-center gap-2 mb-6">
										<span className="text-xl font-semibold text-gray-800">
											Home
										</span>
										<span className="text-sm text-gray-500">
											| {
											card.breadcrumb
										} </span>
									</div>

									{/* Card Content */}
									<div className="flex items-center gap-6">
										<div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100">
											<Icon className="w-7 h-7 text-gray-700"/>
										</div>

										<h3 className="text-lg font-medium text-gray-800">
											{
											card.title
										} </h3>
									</div>
								</div>
							</Link>
						);
					})
				} </div>
			</div>
		</AdminWrapper>
	)
}

export default Dashboard
