import React, { useEffect, useState } from 'react';
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen"; // or wherever your routeTree is


const router = createRouter({ routeTree } as any);


declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long to keep data in cache (5 minutes)
      staleTime: 1000 * 60 * 5,
      // How long to keep unused data in cache (10 minutes)
      gcTime: 1000 * 60 * 10,
      // Retry failed requests 3 times
      retry: 3,
      // Don't refetch on window focus by default (can be enabled per query)
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect by default
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

export function Dashboard() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const auth = JSON.parse(localStorage.getItem('farmday.auth') || '');
      if (auth?.jwt) {
        setAuthorized(true);
      }
    } catch (error) {
      window.history.replaceState({}, 'auth', '/auth');
    }
  }, [])

  const auth = JSON.parse(localStorage.getItem('farmday.auth') || '');

  if (!authorized) {
    return <></>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
