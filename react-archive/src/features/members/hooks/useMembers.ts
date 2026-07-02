import { useQuery } from '@tanstack/react-query';
import { getMembers, getMember } from '../api/members.api';
import type { Member } from '../types';

export const useMembers = () => {
    return useQuery<Member[]>({
        queryKey: ['members'],
        queryFn: getMembers,
    });
};

export const useMember = (id: string) => {
    return useQuery<Member | undefined>({
        queryKey: ['members', id],
        queryFn: () => getMember(id),
        enabled: !!id,
    });
};
