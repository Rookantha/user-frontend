import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../../../api/api';
import type { CreateUserPayload, UpdateUserPayload, User } from '../../../api/api';

const USERS_QUERY_KEY = ['users'];

/**
 * Fetch paginated list of users, optionally filtered by search term
 */
export function useUsersList(search = '', skip = 0, take = 10) {
    return useQuery<User[]>({
        queryKey: [...USERS_QUERY_KEY, 'list', search, skip, take],
        queryFn: () => usersApi.list(skip, take, search),
        // return empty list immediately to avoid undefined checks in UI
        placeholderData: [],
        staleTime: 1000 * 60, // 1 minute
    });
}

/**
 * Fetch a single user by ID
 */
export function useUser(id?: number) {
    return useQuery<User | null>({
        queryKey: [...USERS_QUERY_KEY, 'item', id],
        queryFn: () => (id ? usersApi.get(id) : Promise.resolve(null)),
        enabled: !!id,
    });
}

/**
 * Create a new user
 */
export function useCreateUser() {
    const qc = useQueryClient();

    return useMutation<User, Error, CreateUserPayload>({
        mutationFn: (payload) => usersApi.create(payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: USERS_QUERY_KEY });
        },
    });
}

/**
 * Update existing user
 */
type UpdateUserParams = { id: number; payload: UpdateUserPayload };

export function useUpdateUser() {
    const qc = useQueryClient();

    return useMutation<User, Error, UpdateUserParams>({
        mutationFn: ({ id, payload }) => usersApi.update(id, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: USERS_QUERY_KEY });
        },
    });
}

/**
 * Delete user by ID
 */
export function useDeleteUser() {
    const qc = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: (id) => usersApi.remove(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: USERS_QUERY_KEY });
        },
    });
}
