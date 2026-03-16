import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    X,
    Menu,
    Image,
    FileText,
    Calendar,
    Users,
    LayoutDashboard,
    List,
    Newspaper,
    Users2,
} from "lucide-react";

const SideBar = ({
    isMobileOpen,
    onMobileToggle,
    isCollapsed,
    onToggleCollapse,
}) => {
    const { url } = usePage();
    const currentPath = url.split("/")[1];

    const isActive = (href) => {
        const path = href.replace("/", "");
        return currentPath === path;
    };

    // Get authenticated user from auth prop
    const { auth } = usePage().props;
    const user = auth?.user;

    // Check The Role of the User
    const isAdmin = user?.role === "admin";

    return (
        <>
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onMobileToggle}
                />
            )}

            <div
                className={`
                    fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 transition-all duration-300
                    ${isCollapsed ? "w-16" : "w-64"}
                    ${
                        isMobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >
                {/* Header */}
                <div
                    className={`flex items-center justify-between p-4 border-b h-16 ${
                        isCollapsed ? "px-3" : ""
                    }`}
                >
                    {!isCollapsed && (
                        <Link
                            href="/"
                            className="flex items-center whitespace-nowrap"
                        >
                            <img
                                src="/images/logo.png"
                                alt="SuchiKhabar"
                                className="h-8 w-auto"
                            />
                        </Link>
                    )}
                    <div className="flex items-center space-x-1">
                        {/* Collapse Toggle Button - Only show on desktop */}
                        <button
                            onClick={onToggleCollapse}
                            className="hidden lg:flex p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            title={
                                isCollapsed
                                    ? "Expand sidebar"
                                    : "Collapse sidebar"
                            }
                        >
                            <Menu className="w-4 h-4 text-gray-600" />
                        </button>

                        {/* Mobile Close Button */}
                        <button
                            onClick={onMobileToggle}
                            className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Menu Items */}
                <div
                    className={`p-2 space-y-1 ${isCollapsed ? "px-2" : "px-3"}`}
                >
                    {/* Dashboard */}
                    <Link
                        href="/dashboard"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/dashboard")
                                    ? "bg-gray-200 text-gray-600 "
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Dashboard" : ""}
                    >
                        <LayoutDashboard
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/dashboard")
                                    ? "text-gray-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Dashboard
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Dashboard
                            </div>
                        )}
                    </Link>

                    {/* Category */}
                    <Link
                        href="/category"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/category")
                                    ? "bg-gray-200 text-gray-600 "
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Category" : ""}
                    >
                        <List
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/category")
                                    ? "text-gray-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Category
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Category
                            </div>
                        )}
                    </Link>

                    {/* Article */}
                    <Link
                        href="/article"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/article")
                                    ? "bg-gray-200 text-gray-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Article" : ""}
                    >
                        <Newspaper
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/article")
                                    ? "text-gray-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Article
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Article
                            </div>
                        )}
                    </Link>

                    {/* Banners */}
                    <Link
                        href="/banners"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/banners")
                                    ? "bg-gray-200 text-gray-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Banners" : ""}
                    >
                        <Image
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/banners")
                                    ? "text-gray-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Banners
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Banners
                            </div>
                        )}
                    </Link>

                    {/* heading */}
                    <Link
                        href="/heading"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/heading")
                                    ? "bg-gray-200 text-gray-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Headings" : ""}
                    >
                        <FileText
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/heading")
                                    ? "text-gray-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Headings
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Headings
                            </div>
                        )}
                    </Link>

                    {/* Team Members */}
                    <Link
                        href="/teams"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/teams")
                                    ? "bg-gray-200 text-gray-600 "
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Team Members" : ""}
                    >
                        <Users
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/teams")
                                    ? "text-gray-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Team Members
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Team Members
                            </div>
                        )}
                    </Link>

                    {/* Users */}
                    <Link
                        href="/user"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/user")
                                    ? "bg-gray-200 text-gray-600 "
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Users" : ""}
                    >
                        <Users2
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/user")
                                    ? "text-gray-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Users
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Users
                            </div>
                        )}
                    </Link>

                    {/* Activity Logs */}
                    <Link
                        href="/log"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/log")
                                    ? "bg-gray-200 text-gray-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "User Reservation" : ""}
                    >
                        <Calendar
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/log")
                                    ? "text-gray-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Activity Logs
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Activity Logs
                            </div>
                        )}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SideBar;