import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, fetchUsers } from '../api/client';
import type { User } from '../model/User';

export const USERS_QUERY_KEY = ['users'];

export const useUsersQuery = () => {
  return useQuery<User[]>({
    queryKey: USERS_QUERY_KEY,
    queryFn: fetchUsers,
  });
};

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Pick<User, 'name' | 'status'>) =>
      createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
};
