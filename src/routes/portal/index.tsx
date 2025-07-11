import React, { useState } from 'react';
import {
  IconTrendingUp,
  IconMapPin,
  IconUsers,
  IconPlant,
  IconCoin,
  IconCalendar,
  IconCheck,
  IconX,
  IconMinus,
  IconTool,
  IconPig as IconCow,
  IconSeedling,
  IconChartBar,
  IconNote as IconVote,
  IconFileText,
  IconCamera,
  IconEye
} from '@tabler/icons-react';

const DashboardPage: React.FC = () => {
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  // Mock data - replace with real API calls later
  const investmentData = {
    totalInvestment: 2500,
    farmName: "Aloe Vera Farm",
    location: "Santa Veronica, Atlantico, Colombia",
    shares: 10,
    totalShares: 3000,
    cropStatus: "Growing Well",
    totalEarnings: 4242,
    valuation: 750000,
    yieldEstimate: "High",
    netProfit: 45000,
    profitShare: 150,
    quarterlyRevenue: 75000,
    expenses: 30000,
    latestActivity: "Harvest prep starting soon."
  };

  const votingActivity = [
    { user: "User 7", shares: 8, vote: "yes", proposal: "New Irrigation System" },
    { user: "User 2", shares: 15, vote: "no", proposal: "Expand Cacao Nursery" },
    { user: "User 5", shares: 5, vote: "yes", proposal: "New Irrigation System" },
    { user: "User 4", shares: 11, vote: "abstain", proposal: "Solar Installation System" }
  ];

  const activeProposal = {
    title: "New Irrigation System",
    description: "Vote on investing $15,000 in a new drip irrigation system to improve water efficiency and yield.",
    status: "Open",
    dueDate: "2025-07-15",
    amount: 15000
  };

  const farmUpdates = [
    { date: "2025-06-18", message: "Weekly farm inspection completed. All crops are healthy." },
    { date: "2025-06-15", message: "New irrigation pipes installed in sector 3." },
    { date: "2025-06-12", message: "Soil analysis shows optimal nutrient levels." },
    { date: "2025-06-10", message: "Weather conditions favorable for next growth phase." }
  ];

  const farmPerks = [
    { name: "Flowering Plant", description: "Sponsor a plant", price: 25, icon: IconSeedling },
    { name: "Gift a Cow", description: "Buy a cow", price: 500, icon: IconCow },
    { name: "Farm Tool", description: "Fund tool", price: 100, icon: IconTool }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getVoteColor = (vote: string) => {
    switch (vote) {
      case 'yes': return 'text-green-600';
      case 'no': return 'text-red-600';
      case 'abstain': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const handleVote = (voteType: string) => {
    console.log(`Voting ${voteType} on proposal: ${activeProposal.title}`);
    setSelectedVote(voteType);
    // TODO: Implement actual voting API call
    alert(`Vote "${voteType}" submitted for "${activeProposal.title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Farmday Dashboard</h1>
            <p className="text-green-100">Your Farm, Your Impact, Your Insights.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-200">Latest Activity</div>
            <div className="text-lg font-semibold">{investmentData.latestActivity}</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <IconTrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(investmentData.totalEarnings)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <IconChartBar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Valuation</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(investmentData.valuation)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <IconPlant className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Yield Estimate</p>
              <p className="text-2xl font-bold text-gray-900">{investmentData.yieldEstimate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <IconCoin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Profit Share (Q2 2026)</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(investmentData.profitShare)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Your Investment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Investment</h2>

            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <IconPlant className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(investmentData.totalInvestment)}</h3>
                    <h4 className="text-lg font-semibold text-gray-700 mt-1">{investmentData.farmName}</h4>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <IconMapPin className="w-4 h-4 mr-1" />
                      {investmentData.location}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600">Crop Status</div>
                  <div className="text-lg font-semibold text-green-600">{investmentData.cropStatus}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <IconUsers className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Decision Power</span>
                  </div>
                  <p className="text-lg font-bold text-blue-900">
                    {investmentData.shares} shares out of {investmentData.totalShares.toLocaleString()}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <IconFileText className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Financials (Q2 2026)</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-green-700">Revenue: {formatCurrency(investmentData.quarterlyRevenue)}</p>
                    <p className="text-sm text-green-700">Expenses: {formatCurrency(investmentData.expenses)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Voting Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Decisions & Proposals</h2>

            {/* Recent Voting Activity */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Voting Activity</h3>
              <div className="space-y-3">
                {votingActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">{activity.user.slice(-1)}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> voted{' '}
                          <span className="font-medium">{activity.shares} shares</span> for{' '}
                          <span className={`font-medium ${getVoteColor(activity.vote)}`}>{activity.vote}</span>
                        </p>
                        <p className="text-xs text-gray-600">in "{activity.proposal}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Proposal */}
            <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Proposal: {activeProposal.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activeProposal.description}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {activeProposal.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <IconCalendar className="w-4 h-4 mr-1" />
                    Due: {formatDate(activeProposal.dueDate)}
                  </span>
                  <span className="flex items-center">
                    <IconCoin className="w-4 h-4 mr-1" />
                    Amount: {formatCurrency(activeProposal.amount)}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleVote('approve')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${selectedVote === 'approve'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
                    }`}
                >
                  <IconCheck className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleVote('reject')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${selectedVote === 'reject'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-red-600 border border-red-600 hover:bg-red-50'
                    }`}
                >
                  <IconX className="w-4 h-4" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => handleVote('abstain')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${selectedVote === 'abstain'
                    ? 'bg-gray-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <IconMinus className="w-4 h-4" />
                  <span>Abstain</span>
                </button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mx-auto">
                <IconVote className="w-4 h-4 mr-1" />
                Propose New Vote
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Farm Perks & Add-ons */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Farm Perks & Add-ons</h2>
            <div className="space-y-3">
              {farmPerks.map((perk, index) => {
                const Icon = perk.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{perk.name}</h3>
                        <p className="text-xs text-gray-600">{perk.description}</p>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      Buy: {formatCurrency(perk.price)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Latest Farm Updates */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Farm Updates</h2>
            <div className="space-y-4">
              {farmUpdates.map((update, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-green-600">{formatDate(update.date)}</span>
                  </div>
                  <p className="text-sm text-gray-700">{update.message}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <IconCamera className="w-4 h-4" />
                  <span>Photos</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <IconFileText className="w-4 h-4" />
                  <span>Reports</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <IconEye className="w-4 h-4" />
                  <span>Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const Route = createFileRoute({
  component: DashboardPage,
});
