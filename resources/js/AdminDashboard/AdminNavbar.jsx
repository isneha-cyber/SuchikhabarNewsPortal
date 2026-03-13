import React, { useState, useRef, useEffect } from "react";
import {
    LogOut,
    User,
    Settings,
    ChevronDown,
    ChevronUp,
    Menu,
} from "lucide-react";
import { usePage } from "@inertiajs/react";

const AdminNavbar = ({ toggleSidebar }) => {
    const user = usePage().props.auth.user;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const imgurl = import.meta.env.VITE_IMAGE_PATH;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLogout = () => {
        axios
            .post(route("logout"))
            .then((response) => {
                window.location.href = response.data.redirect || "/login";
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    const getInitials = () => {
        const name = user.name?.trim() || "";
        const names = name.split(" ").filter(Boolean);
        if (names.length === 0) return "?";
        const firstInitial = names[0][0].toUpperCase();
        const lastInitial = names.length > 1 ? names[names.length - 1][0].toUpperCase() : "";
        return lastInitial ? `${firstInitial}${lastInitial}` : firstInitial;
    };

    const getAvatarColor = () => {
        const name = user.name || "";
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return `hsl(${hash % 360}, 60%, 70%)`;
    };

    const hasImage =
        user.image &&
        typeof user.image === "string" &&
        user.image.trim() !== "";

    return (
        <div className="w-full px-4 md:px-6 py-3 bg-white shadow-md fixed top-0 right-0 z-30 transition-all duration-300">
            <div className="flex items-center justify-between">

                {/* ── LEFT: hamburger + logo ── */}
                <div className="flex items-center gap-3">
                    {/* Hamburger — visible on mobile/tablet */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Logo — always visible */}
                    <a href="/" className="flex items-center">
                        <img
                            src="/images/logo.png"
                            alt="ShuchikKhabar"
                            className="h-9 w-auto object-contain"
                            onError={(e) => {
                                // fallback text if image missing
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextSibling.style.display = "block";
                            }}
                        />
                        <span
                            className="hidden text-base font-bold text-[#8B0000] tracking-wide"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            शुचीखबर
                        </span>
                    </a>
                </div>

                {/* ── SPACER ── */}
                <div className="flex-1" />

                {/* ── RIGHT: user dropdown ── */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center space-x-2 md:space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={toggleDropdown}
                    >
                        {hasImage ? (
                            <img
                                src={`${imgurl}/${user.image}`}
                                alt={user.name}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-200"
                                onError={(e) => { e.target.style.display = "none"; }}
                            />
                        ) : (
                            <div
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-semibold border-2 border-gray-200"
                                style={{ backgroundColor: getAvatarColor() }}
                            >
                                {getInitials()}
                            </div>
                        )}

                        <div className="hidden lg:flex flex-col items-end mr-2">
                            <span className="text-sm font-semibold text-gray-800">
                                {user.name}
                            </span>
                            <span className="text-xs text-gray-500 truncate max-w-[160px]">
                                {user.email}
                            </span>
                        </div>

                        {isDropdownOpen
                            ? <ChevronUp size={16} className="text-gray-500" />
                            : <ChevronDown size={16} className="text-gray-500" />
                        }
                    </div>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 md:w-56 bg-white rounded-xl shadow-lg py-2 z-40 border border-gray-100">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">Signed in as</p>
                                <p className="text-xs md:text-sm text-gray-500 truncate">{user.email}</p>
                            </div>

                            <a
                                href="#"
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                onClick={(e) => { e.preventDefault(); setIsDropdownOpen(false); }}
                            >
                                <User size={16} className="mr-3" />
                                Your Profile
                            </a>
                            <a
                                href="#"
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                onClick={(e) => { e.preventDefault(); setIsDropdownOpen(false); }}
                            >
                                <Settings size={16} className="mr-3" />
                                Account Settings
                            </a>

                            <div className="border-t border-gray-100 my-1" />

                            <button
                                className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                onClick={handleLogout}
                            >
                                <LogOut size={16} className="mr-3" />
                                Sign out
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AdminNavbar;