import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Member } from '../types';

const MEMBERS_COLLECTION = 'members';

export const getMembers = async (): Promise<Member[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, MEMBERS_COLLECTION));
        const members: Member[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            members.push({
                id: doc.id,
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                phone: data.phone || '',
                status: data.status || 'active',
                ...data
            } as Member);
        });
        return members;
    } catch (error) {
        console.error('Error fetching members from Firestore:', error);
        throw error;
    }
};

export const getMember = async (id: string): Promise<Member | undefined> => {
    try {
        const docRef = doc(db, MEMBERS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Member;
        }
        return undefined;
    } catch (error) {
        console.error(`Error fetching member with id ${id} from Firestore:`, error);
        throw error;
    }
};

export const createMember = async (data: Omit<Member, 'id'>): Promise<Member> => {
    try {
        const docRef = await addDoc(collection(db, MEMBERS_COLLECTION), {
            ...data,
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, ...data } as Member;
    } catch (error) {
        console.error('Error creating member in Firestore:', error);
        throw error;
    }
};

export const updateMember = async (id: string, data: Partial<Member>): Promise<void> => {
    try {
        const docRef = doc(db, MEMBERS_COLLECTION, id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error(`Error updating member with id ${id} in Firestore:`, error);
        throw error;
    }
};
