import React from "react";

export const Route = createFileRoute({
  component: Performance,
});

function Performance() {
  const openQuestions = [
    {
      id: 1,
      question: "Partner with chocolate brand for US exports?",
      status: "Open",
    },
    {
      id: 2,
      question: "Reinvest profits into irrigation upgrade?",
      status: "Open",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-green-50 to-yellow-50 py-10">
      <h1 className="text-3xl font-extrabold mb-2 text-gray-900">Farmday Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">Your Investments & Performance</p>
      <div className="w-full max-w-xl bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            <img src="https://markketplace.nyc3.digitaloceanspaces.com/uploads/84dfae95197adb92bdd894640afbdf10.jpg" alt="Cacao Farm" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Cacao Farm Colombia</h2>
            <span className="inline-block mt-1 px-3 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">
              Active
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-6">
          <div className="text-lg font-semibold text-gray-700">You paid</div>
          <div className="text-2xl font-bold text-green-600">$10,000</div>
        </div>
        <div className="w-full grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
            <img src="https://markketplace.nyc3.digitaloceanspaces.com/uploads/582e2a1639291cf16fd5de04c4dd71c5.avif" alt="Performance Chart" className="w-24 h-24 object-contain" />
          </div>
          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
            <img src="https://markketplace.nyc3.digitaloceanspaces.com/uploads/c04a9c731cb0eb453c4598bedcdd6cb2.jpg" alt="Farm Image" className="w-24 h-24 object-contain" />
          </div>
        </div>
        <div className="w-full text-center text-gray-400 text-xs mt-2">
          (Performance data and images coming soon)
        </div>

        <div className="w-full border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
            <div>
              <div className="text-gray-700 font-semibold">Next payout expected</div>
              <div className="text-xl font-bold text-blue-600">$300 <span className="text-sm text-gray-500">in Feb 2026</span></div>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-semibold mr-2">
                4 Shares
              </span>
              <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-semibold">
                Voting Rights
              </span>
            </div>
          </div>
          <div className="mb-6">
            <div className="text-gray-700 font-semibold mb-2">Open Questions (Vote):</div>
            <ul className="space-y-2">
              {openQuestions.map((q) => (
                <li key={q.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                  <span>{q.question}</span>
                  <button className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold hover:bg-blue-600 transition">
                    Vote
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <div className="text-gray-700 font-semibold mb-1">Other Important Info</div>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>Stripe payouts</li>
              <li>Annual general meeting: Jan 2026</li>
              <li>Transfer shares anytime (coming soon)</li>
              <li>Access farm reports and documents</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
