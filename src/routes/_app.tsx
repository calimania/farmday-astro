import React from 'react';
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen"; // or wherever your routeTree is


const router = createRouter({ routeTree } as any);


declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient(


);


export function Dashboard() {
  return (
    <div className="min-h-[90vh] py-16 px-4">
      {/* <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-lg z-50">
        <div className="max-w-6xl px-4 py-4">
          <a
            href={`/portal/`}
            className=" hover:text-white transition-colors inline-flex items-center gap-2 group"
          >
            <span>Portal</span>
          </a>
        </div>
      </div> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
