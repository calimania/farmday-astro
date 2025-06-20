import { markketplace } from "../../config";
import type { Store } from '../../markket/index.d';
import { useQuery } from "@tanstack/react-query";
import React from 'react';

export const Route = createFileRoute({
  component: About,
});

const fetchStore = async () => {
  const res = await fetch(new URL(`/api/stores?filters[slug][$eq]=${markketplace.store_slug}&populate[]=Logo&populate[]=SEO`, markketplace.api));
  if (!res.ok) throw new Error("Failed to fetch store");
  return res.json();
};

function About() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["store"],
    queryFn: fetchStore,
  });

  const store = data?.data?.[0] as Store;

  if (isLoading) return <div className="p-8 text-lg">Loading store info…</div>;
  if (error) return <div className="p-8 text-red-500">Error loading store!</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-2">{store?.title || "Kundor"}</h1>
      <p className="text-lg text-gray-600 mb-4">
        Dashboard
      </p>
      <img
        src={store?.Logo?.url}
        alt="Store Logo"
        className="w-24 h-24 rounded-full shadow mb-4"
      />
      <div className="bg-blue-50 px-4 py-2 rounded text-blue-700">
        {data?.SEO?.metaDescription || "Portal"}
      </div>
    </div>
  );
}

export default About;
