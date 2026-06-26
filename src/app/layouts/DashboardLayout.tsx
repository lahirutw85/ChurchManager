import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Topbar from "../../components/common/Topbar";
import { useState } from "react";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <button
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar overlay"
                />
            )}

            {/* Sidebar */}
            <aside
                className={[
                    "fixed z-50 h-screen w-64 bg-white border-r border-gray-200 dark:bg-gray-950 dark:border-gray-800",
                    "transition-transform md:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                ].join(" ")}
            >
                <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </aside>

            {/* Main area */}
            <div className="md:pl-64">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
