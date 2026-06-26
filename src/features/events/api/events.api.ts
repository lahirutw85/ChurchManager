import { collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Event, CreateEventDTO } from '../types';

const EVENTS_COLLECTION = 'events';

export const getEvents = async (): Promise<Event[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, EVENTS_COLLECTION));
        const events: Event[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            events.push({
                id: doc.id,
                name: data.name || '',
                date: data.date || '',
                time: data.time || '',
                location: data.location || '',
                description: data.description || '',
                type: data.type || 'other',
                status: data.status || 'scheduled',
                ...data
            } as Event);
        });
        return events;
    } catch (error) {
        console.error('Error fetching events from Firestore:', error);
        throw error;
    }
};

export const getEvent = async (id: string): Promise<Event | undefined> => {
    try {
        const docRef = doc(db, EVENTS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Event;
        }
        return undefined;
    } catch (error) {
        console.error(`Error fetching event with id ${id} from Firestore:`, error);
        throw error;
    }
};

export const createEvent = async (data: CreateEventDTO): Promise<Event> => {
    try {
        const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
            ...data,
            status: 'scheduled',
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, status: 'scheduled', ...data } as Event;
    } catch (error) {
        console.error('Error creating event in Firestore:', error);
        throw error;
    }
};
