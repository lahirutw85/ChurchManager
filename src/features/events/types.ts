export type EventType = 'service' | 'meeting' | 'social' | 'outreach' | 'other';

export interface Event {
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    type: EventType;
    status: 'scheduled' | 'cancelled' | 'completed';
}

export type CreateEventDTO = Omit<Event, 'id' | 'status'>;
