export type Member = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    ministry?: string;
};
