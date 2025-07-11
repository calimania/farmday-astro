import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

// Query keys - centralized for consistency
export const queryKeys = {
  // Test queries
  markket: ['markket'] as const,

  // User queries
  me: ['user', 'me'] as const,

  // Orders queries
  orders: (filters?: any) => ['orders', filters] as const,
  order: (id: string) => ['orders', id] as const,
};

// Test hook to verify API connection
export function useMarkket() {
  return useQuery({
    queryKey: queryKeys.markket,
    queryFn: api.getMarkket,
    // This query can be cached for a long time since it's just a test
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

// User data hooks
export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: api.getMe,
    // User data should be fresh
    staleTime: 1000 * 60 * 2, // 2 minutes
    // Retry less for user data
    retry: 2,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updateProfile,
    onSuccess: (data) => {
      // Update the user cache with new data
      queryClient.setQueryData(queryKeys.me, data);
      // Or invalidate to refetch
      // queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });
}

// Orders hooks
export function useOrders(filters?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: queryKeys.orders(filters),
    queryFn: () => api.getOrders(),
    // Keep orders data fresh
    staleTime: 1000 * 60 * 1, // 1 minute
    // Enable background refetch
    refetchOnWindowFocus: true,
  });
}

// export function useOrder(id: string) {
//   return useQuery({
//     queryKey: queryKeys.order(id),
//     queryFn: () => api.getOrder(id),
//     // Individual orders can be cached longer
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     // Only fetch if we have an ID
//     enabled: !!id,
//   });
// }

// Example of a more complex hook with dependent queries
export function useDashboardData() {
  const userQuery = useMe();
  const ordersQuery = useOrders({ limit: 10 });

  return {
    user: userQuery,
    orders: ordersQuery,
    isLoading: userQuery.isLoading || ordersQuery.isLoading,
    isError: userQuery.isError || ordersQuery.isError,
    error: userQuery.error || ordersQuery.error,
  };
}
