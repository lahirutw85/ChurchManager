import type { Event, CreateEventDTO } from '../types';

const MOCK_EVENTS: Event[] = [
    {
        id: '1',
        name: 'Sunday Service',
        date: '2024-03-24',
        time: '09:00',
        location: 'Main Sanctuary',
        description: 'Regular Sunday worship service.',
        type: 'service',
        status: 'scheduled'
    },
    {
        id: '2',
        name: 'Youth Bible Study',
        date: '2024-03-27',
        time: '18:30',
        location: 'Youth Hall',
        description: 'Weekly bible study for teens.',
        type: 'meeting',
        status: 'scheduled'
    },
    {
        id: '3',
        name: 'Community Picnic',
        date: '2024-04-01',
        time: '12:00',
        location: 'City Park',
        description: 'Annual church picnic.',
        type: 'social',
        status: 'scheduled'
    }
];

export const getEvents = async (): Promise<Event[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...MOCK_EVENTS]), 600);
    });
};

export const getEvent = async (id: string): Promise<Event | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const event = MOCK_EVENTS.find(e => e.id === id);
            resolve(event);
        }, 500);
    });
};

export const createEvent = async (data: CreateEventDTO): Promise<Event> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newEvent: Event = {
                ...data,
                id: Math.random().toString(36).substr(2, 9),
                status: 'scheduled'
            };
            MOCK_EVENTS.push(newEvent);
            resolve(newEvent);
        }, 800);
    });
};
