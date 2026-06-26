import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Home,
    UsersRound,
    HandHeart,
    Calendar,
    ClipboardCheck,
    BarChart3,
    Settings
} from "lucide-react";

type Props = {
    onNavigate?: () => void;
};

const nav = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/members", label: "Members", icon: Users },
    { to: "/households", label: "Families", icon: Home },
    { to: "/groups", label: "Groups", icon: UsersRound },
    { to: "/ministries", label: "Ministries", icon: HandHeart },
    { to: "/events", label: "Events", icon: Calendar },
    { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
    { to: "/reports", label: "Reports", icon: BarChart3 },
    { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ onNavigate }: Props) {
    return (
        <div className="h-full flex flex-col">
            {/* Brand */}
            <div className="h-16 px-4 flex items-center border-b border-gray-200 dark:border-gray-800">
                <div className="font-semibold text-lg">Church Manager</div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {nav.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                            [
                                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-950"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100",
                            ].join(" ")
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
                v1.0 • Dubai church
            </div>
        </div>
    );
}
