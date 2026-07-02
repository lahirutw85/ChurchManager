import { Users, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMembers } from '../../members/hooks/useMembers';
import { useEvents } from '../../events/hooks/useEvents';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
    const { data: members } = useMembers();
    const { data: events } = useEvents();

    const stats = [
        {
            title: "Total Members",
            value: members?.length || 0,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },
        {
            title: "Weekly Attendance",
            value: "142", // Mock
            icon: Calendar,
            color: "text-green-600",
            bg: "bg-green-100"
        },
        {
            title: "Total Giving",
            value: "$12,450", // Mock
            icon: TrendingUp,
            color: "text-purple-600",
            bg: "bg-purple-100"
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight dark:text-gray-50">Dashboard</h1>

                <p className="text-gray-500 mt-1 dark:text-gray-400">Welcome back, Pastor.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-200 dark:bg-gray-900 dark:border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stat.value}</div>
                            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-none shadow-md dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-900/30">
                                        <TrendingUp className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none dark:text-gray-200">New donation received</p>
                                        <p className="text-sm text-gray-500">
                                            Someone gave $100.00
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-sm text-gray-500">+1h ago</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 border-none shadow-md dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader>
                        <CardTitle>Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {events?.slice(0, 3).map((event) => (
                                <Link key={event.id} to={`/events/${event.id}`} className="block group">
                                    <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors dark:hover:bg-gray-800">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none group-hover:text-indigo-600 transition-colors dark:text-gray-200 dark:group-hover:text-indigo-400">{event.name}</p>
                                            <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                                        </div>
                                        <div className={`px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wide ${event.type === 'service' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                                            }`}>
                                            {event.type}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
