import { useParams, Link } from 'react-router-dom';
import { useEvent } from '../hooks/useEvents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';

export const EventDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: event, isLoading } = useEvent(id || '');

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading event...</div>;
    if (!event) return <div className="p-8 text-center text-red-500">Event not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/events">
                    <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Events
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex justify-between items-start">
                    <div>
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wide ${event.type === 'service' ? 'bg-purple-100 text-purple-800' :
                            event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }`}>
                            {event.type}
                        </span>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-50">{event.name}</h1>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">{event.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${event.status === 'scheduled' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                        {event.status.toUpperCase()}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Calendar className="w-5 h-5 text-indigo-500" />
                        <div>
                            <div className="text-xs text-gray-400 uppercase font-semibold">Date</div>
                            <div>{event.date}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Clock className="w-5 h-5 text-indigo-500" />
                        <div>
                            <div className="text-xs text-gray-400 uppercase font-semibold">Time</div>
                            <div>{event.time}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <MapPin className="w-5 h-5 text-indigo-500" />
                        <div>
                            <div className="text-xs text-gray-400 uppercase font-semibold">Location</div>
                            <div>{event.location}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" /> Attendance
                    </CardTitle>
                    <Button size="sm" variant="outline">Check-in Members</Button>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded border border-dashed border-gray-200 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-400">
                        No attendance records yet.
                        <br />
                        <span className="text-xs">Attendance feature coming soon.</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
