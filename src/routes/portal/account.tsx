// import { markketplace } from "../../config";
// import type { Store } from '../../markket';
// import { useQuery } from "@tanstack/react-query";
import React from 'react';

export const Route = createFileRoute({
  component: Performance,
});


function Performance() {

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-2">Farmday</h1>
      <p className="text-lg text-gray-600 mb-4">
        Account
      </p>
    </div>
  );
}

export default Performance;
