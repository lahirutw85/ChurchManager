

type Props = {
    onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: Props) {
    return (
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
            <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-3">
                {/* Mobile menu button */}
                <button
                    className="md:hidden rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={onMenuClick}
                >
                    Menu
                </button>

                {/* Search */}
                <div className="flex-1 max-w-xl">
                    <input
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:focus:ring-gray-700"
                        placeholder="Search members, families, groups..."
                    />
                </div>

                {/* User */}
                <div className="flex items-center gap-2">

                    <button className="rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 dark:text-gray-200">
                        Notifications
                    </button>
                    <button className="rounded-xl bg-gray-900 text-white px-3 py-2 text-sm dark:bg-white dark:text-gray-900">
                        Admin
                    </button>
                </div>
            </div>
        </header>
    );
}
