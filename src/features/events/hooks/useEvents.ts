import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEvents, getEvent, createEvent } from '../api/events.api';
import type { CreateEventDTO } from '../types';

export const useEvents = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });
};

export const useEvent = (id: string) => {
    return useQuery({
        queryKey: ['events', id],
        queryFn: () => getEvent(id),
        enabled: !!id,
    });
};

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateEventDTO) => createEvent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });
};
