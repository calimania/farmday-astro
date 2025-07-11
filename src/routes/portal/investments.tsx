
import React, { useState } from 'react';
import { useOrders, useMarkket } from '../../hooks/useApi';
import {
  IconReceipt,
  IconCalendar,
  IconCreditCard,
  IconMapPin,
  IconPackage,
  IconTrendingUp,
  IconEye,
  IconDownload,
  IconFilter,
  IconSearch
} from '@tabler/icons-react';
import type { Order } from '@/markket';

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Test API connection
  const { data: markketData, isLoading: markketLoading } = useMarkket();

  // Fetch orders with current filters
  const {
    data: ordersResponse,
    isLoading: ordersLoading,
    isError: ordersError,
    error: ordersErrorDetails
  } = useOrders({
    search: searchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    limit: 50
  });



  // For now, fall back to local data since API might not have orders endpoint ready
  const fallbackOrders = [

  ] as Order[];

  // Use API data if available, otherwise fall back to local data
  const orders = ordersResponse || fallbackOrders;

  console.log({orders, ordersResponse})

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.Details.some(detail =>
      detail.product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || order.Shipping_Address.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.Status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'complete':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalInvestment = orders.reduce((sum, order) => sum + order.Amount, 0);
  const completedOrders = orders.filter(order => order.Status === 'complete').length;

  return (
    <div className="space-y-6">
      {/* API Status Indicator */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${markketLoading ? 'bg-yellow-400 animate-pulse' : markketData ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              API Status: {markketLoading ? 'Connecting...' : markketData ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {markketData && (
            <span className="text-xs text-gray-500">
              Response: {markketData.message}
            </span>
          )}
        </div>

        {ordersError && (
          <div className="mt-2 text-sm text-orange-600">
            Orders API: Using fallback data ({ordersErrorDetails?.message || 'API not ready'})
          </div>
        )}

        {ordersLoading && (
          <div className="mt-2 text-sm text-blue-600">
            Loading orders from API...
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <IconTrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Investment</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(totalInvestment)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <IconPackage className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Shares</p>
              <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <IconReceipt className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search investments..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <IconFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="complete">Complete</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                    <IconReceipt className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <IconCalendar className="w-4 h-4 mr-1" />
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <IconCreditCard className="w-4 h-4 mr-1" />
                      {order.STRIPE_PAYMENT_ID}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(order.Amount, order.Currency)}
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.Status)}`}>
                    {order.Status.charAt(0).toUpperCase() + order.Status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3">
                {order.Details.map((detail) => (
                  <div key={detail.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={detail.product.Thumbnail?.formats?.thumbnail?.url || detail.product.Thumbnail?.url}
                      alt={detail.product.Name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{detail.product.Name}</h4>
                      <p className="text-sm text-gray-600">
                        {detail.Name} • Qty: {detail.Quantity} • {formatPrice(detail.Price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start space-x-3">
                  <IconMapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div> */}
                    {/* <h4 className="font-medium text-gray-900">Shipping Address</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.Shipping_Address.name}<br />
                      {order.Shipping_Address.street}
                      {order.Shipping_Address.street_2 && <>, {order.Shipping_Address.street_2}</>}<br />
                      {order.Shipping_Address.city}, {order.Shipping_Address.state} {order.Shipping_Address.zipcode}<br />
                      {order.Shipping_Address.country}
                    </p> */}
                  {/* </div>
                </div>
              </div> */}

              {/* Actions */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Last updated: {formatDate(order.updatedAt)}
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => console.log('View order details:', order.id)}
                    className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <IconEye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <IconDownload className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconReceipt className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No investments found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'You haven\'t made any investments yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
};


export const Route = createFileRoute({
  component: OrdersPage,
})
