import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ isOpen, setIsOpen }) => {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
            ? "bg-green-600 text-white shadow-md"
            : "text-gray-200 hover:bg-white/10 hover:text-white"
        }`;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-green-700  to-blue-900 text-white shadow-lg transform transition-transform duration-300 ${isOpen
                    ? "translate-x-0"
                    : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="p-6">

                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-full bg-white text-green-700 flex items-center justify-center font-bold text-lg">
                            M
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                MaziwaSync
                            </h2>
                            <p className="text-xs text-green-200">
                                Admin Dashboard
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        <NavLink to="/admin-dashboard" end className={linkClass} onClick={() => setIsOpen(false)}>
                            <i className="bi bi-speedometer2"></i>
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink to="/admin-dashboard/admin/profile" end className={linkClass} onClick={() => setIsOpen(false)}>
                            <i className="bi bi-person-circle"></i>
                            <span> Profile</span>
                        </NavLink>
                        <NavLink to="/admin-dashboard/admin/porter" end className={linkClass} onClick={() => setIsOpen(false)}>
                            <i className="bi bi-plus-circle"></i>
                            <span> Porter</span>
                        </NavLink>
                        <NavLink to="/admin-dashboard/admin/farmer" end className={linkClass} onClick={() => setIsOpen(false)}>
                            <i className="bi bi-plus-circle"></i>
                            <span> Farmer</span>
                        </NavLink>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
