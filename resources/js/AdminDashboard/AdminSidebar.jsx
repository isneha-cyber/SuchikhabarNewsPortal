

import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    Users,
    LogOut,
    Image,
    User,
    Newspaper,
    X,
    List,
    FileText,
    Archive
} from "lucide-react";
import axios from "axios";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
    const { url } = usePage();
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        setActiveLink(url);
    }, [url]);

    const isActiveLink = (path) => {
        return activeLink.startsWith(path)
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
    };

    const handleLogout = () => {
        axios
            .post(route("logout"))
            .then((response) => {
                if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                } else {
                    window.location.href = "/login";
                }
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    return (
        <>
            {/* Backdrop for mobile and tablet */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            
            <aside
                className={`fixed top-0 left-0 z-50 h-screen bg-slate-50 text-slate-800 transform transition-transform duration-300 ease-in-out w-64 ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="relative flex justify-between items-center p-4 md:p-6">
                    <img
                        src="../logo.png"
                        alt="SuchiKhabar"
                        className="w-full h-12 md:h-16 object-contain"
                    />
                    {/* Close button for mobile and tablet */}
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-2 right-2 lg:hidden p-2 rounded-full hover:bg-gray-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 md:px-4 space-y-1 mt-4 overflow-y-auto h-[calc(100vh-10rem)]">
                    <Link
                        href="/home"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/home"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Home size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Home</span>
                    </Link>

                    <Link
                        href="/category"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/category"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <List size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Categories</span>
                    </Link>

                    <Link
                        href="/article"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/article"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Newspaper size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">News Articles</span>
                    </Link>
                    
                    <Link
                        href="/banners"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/banners"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Image size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Banners</span>
                    </Link>
                    
                    <Link
                        href="/heading"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/heading"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <FileText size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Headings</span>
                    </Link>

                    <Link
                        href="/teams"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/teams"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Users size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Team Members</span>
                    </Link>

                    <Link
                        href="/user"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/user"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <User size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Users</span>
                    </Link>

                    <Link
                        href="/log"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/log"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Archive size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Activity Logs</span>
                    </Link>
                </nav>

                {/* Logout Button at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 border-t border-gray-200 bg-slate-50">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                        className="flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all w-full text-left text-sm md:text-base"
                    >
                        <LogOut size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;