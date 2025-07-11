import { markketplace } from "@/config";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(endpoint, markketplace.api);

  const jwt = JSON.parse(localStorage.getItem('farmday.auth') || '')?.jwt;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${jwt}`,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Specific API functions
export const api = {
  // Test endpoint
  getMarkket: () => apiRequest<{ message: string }>('/markket'),

  // User endpoints
  getMe: () => {

    // const id = JSON.parse(localStorage.getItem('farmday.auth') || '')?.user?.id

    return apiRequest<{
      id: string;
      email: string;
      name: string;
      avatar?: string;
      joinedDate: string;
      totalInvestment: number;
      activeShares: number;
    }>(`/api/users/me?populate=avatar`)
  },

  updateProfile: (data: any) => apiRequest('/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  getOrders: () => apiRequest(`/orders/mine`),

  // Orders endpoints
  // getOrders: (params?: {
  //   page?: number;
  //   limit?: number;
  //   status?: string;
  //   search?: string;
  // }) => {
  //   const searchParams = new URLSearchParams();
  //   if (params?.page) searchParams.append('page', params.page.toString());
  //   if (params?.limit) searchParams.append('limit', params.limit.toString());
  //   if (params?.status && params.status !== 'all') searchParams.append('status', params.status);
  //   if (params?.search) searchParams.append('search', params.search);

  //   const queryString = searchParams.toString();
  //   const endpoint = `/orders/mine${queryString ? `?${queryString}` : ''}`;

  //   return apiRequest<{
  //     data: any[];
  //     meta: {
  //       total: number;
  //       page: number;
  //       limit: number;
  //       totalPages: number;
  //     };
  //   }>(endpoint);
  // },
};
