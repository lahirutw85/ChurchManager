import { useEvents } from '../hooks/useEvents';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EventsListPage = () => {
    const { data: events, isLoading } = useEvents();

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading events...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Events</h1>
                <Link to="/events/new">
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Create Event
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events?.map((event) => (
                    <Link key={event.id} to={`/events/${event.id}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full dark:bg-gray-900 dark:border-gray-800">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wide ${event.type === 'service' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                        event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                                        }`}>
                                        {event.type}
                                    </span>
                                </div>
                                <CardTitle className="mt-2 text-lg">{event.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> {event.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {event.time}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> {event.location}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            {events?.length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400">
                    No events scheduled. Create one to get started.
                </div>
            )}
        </div>
    );
};
