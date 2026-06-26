// import { apiClient } from '@/lib/apiClient';
import type { Member } from '../types';

export const getMembers = async (): Promise<Member[]> => {
    // Mock data for demo purposes since backend isn't ready
    // In real app: return await apiClient.get('/members');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', status: 'active', ministry: 'Worship Team' },
                { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', status: 'active', ministry: 'Kids Ministry' },
                { id: '3', firstName: 'Robert', lastName: 'Johnson', email: 'bob.j@example.com', phone: '555-019-2834', status: 'inactive' },
                { id: '4', firstName: 'Sarah', lastName: 'Williams', email: 'sarah.w@example.com', phone: '555-928-1736', status: 'active', ministry: 'Welcome Team' },
                { id: '5', firstName: 'Michael', lastName: 'Brown', email: 'm.brown@example.com', phone: '555-827-3645', status: 'active' },
            ]);
        }, 800); // Simulate network delay
    });
};

export const getMember = async (id: string): Promise<Member | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real app we would fetch by ID. Here we just find it in the mock array.
            // We need to move MOCK_MEMBERS out of the function scope or duplicate logic for now.
            const MOCK_MEMBERS: Member[] = [
                { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', status: 'active', ministry: 'Worship Team' },
                { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', status: 'active', ministry: 'Kids Ministry' },
                { id: '3', firstName: 'Robert', lastName: 'Johnson', email: 'bob.j@example.com', phone: '555-019-2834', status: 'inactive' },
                { id: '4', firstName: 'Sarah', lastName: 'Williams', email: 'sarah.w@example.com', phone: '555-928-1736', status: 'active', ministry: 'Welcome Team' },
                { id: '5', firstName: 'Michael', lastName: 'Brown', email: 'm.brown@example.com', phone: '555-827-3645', status: 'active' },
            ];
            const member = MOCK_MEMBERS.find(m => m.id === id);
            resolve(member);
        }, 500);
    });
};
