import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useCreateEvent } from '../hooks/useEvents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const eventSchema = z.object({
    name: z.string().min(3, "Event name is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    location: z.string().min(3, "Location is required"),
    type: z.enum(['service', 'meeting', 'social', 'outreach', 'other']),
    description: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

export const EventCreatePage = () => {
    const navigate = useNavigate();
    const createEventMutation = useCreateEvent();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            type: 'service'
        }
    });

    const onSubmit = (data: EventFormValues) => {
        createEventMutation.mutate({ ...data, description: data.description || '' }, {
            onSuccess: () => {
                navigate('/events');
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/events">
                    <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Events
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
                <p className="text-gray-500">Schedule a service, meeting, or event.</p>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Event Name</Label>
                            <Input id="name" {...register('name')} placeholder="e.g. Sunday Service" />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" {...register('date')} />
                                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input id="time" type="time" {...register('time')} />
                                {errors.time && <p className="text-sm text-red-500">{errors.time.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" {...register('location')} placeholder="e.g. Main Sanctuary" />
                            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <select
                                id="type"
                                {...register('type')}
                                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="service">Service</option>
                                <option value="meeting">Meeting</option>
                                <option value="social">Social</option>
                                <option value="outreach">Outreach</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                            <Link to="/dashboard/events">
                                <Button type="button" variant="ghost">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting || createEventMutation.isPending}>
                                {isSubmitting ? 'Creating...' : 'Create Event'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
