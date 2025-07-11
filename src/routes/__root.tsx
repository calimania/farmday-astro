import React, { useState, } from 'react';
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	useNavigate,
	Outlet,
	createRootRouteWithContext,
	useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AstroGlobal } from 'astro'
import { useStore } from '../hooks/useApi';

export const Route = createRootRouteWithContext<{
	astroContext: AstroGlobal | undefined
	queryClient: QueryClient
}>()({
	component: Layout,
})

import {
	IconDashboard,
	IconReceipt,
	IconUser,
	IconLogout,
	IconMenu2,
	IconX,
	IconTrendingUp,
	IconMapPin
} from '@tabler/icons-react';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ }: LayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouterState();
	const navigate = useNavigate({ from: router.location.pathname })

	const {
		data: storeResponse,
		isLoading: storeLoading,
		isError: storeError,
		error: storeErrorDetails
	} = useStore();

	const store = storeResponse?.data?.[0];

	console.log({ store })

	const navigation = [
		{
			id: 'dashboard' as const,
			name: 'Dashboard',
			icon: IconDashboard,
			description: 'investment overview and voting',
			path: '/portal'
		},
		{
			id: 'orders' as const,
			name: 'My Investments',
			icon: IconReceipt,
			description: 'Order details',
			path: '/portal/investments'
		},
		{
			id: 'profile' as const,
			name: 'Profile',
			icon: IconUser,
			path: '/portal/profile',
			description: 'Manage your account settings'
		},
	];

	const activeTab = navigation.find((n) => n.path == router.location.pathname)

	const handleLogout = () => {
		localStorage.removeItem('farmday.auth');
		window.history.pushState({}, 'auth', '/auth');
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Mobile sidebar backdrop */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
				}`}>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-gray-200">
						<div className="flex items-center space-x-3">
							{!store?.Favicon?.url
								? (<div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center"><IconTrendingUp className="w-6 h-6 text-white" /> </div>)
								: (
									<img src={store?.Favicon?.url} className='w-12' />
								)}
							<div>
								<h1 className="text-xl font-bold text-gray-900">{store?.title}</h1>
								<p className="text-sm text-gray-500">Fun Farming Fintech</p>
							</div>
						</div>
						<button
							onClick={() => setSidebarOpen(false)}
							className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
						>
							<IconX className="w-5 h-5 text-gray-500" />
						</button>
					</div>

					{/* Navigation */}
					<nav className="flex-1 p-6 space-y-2">
						{navigation.map((item) => {
							const Icon = item.icon;
							const isActive = activeTab?.path === item.path;

							return (
								<button
									key={item.id}
									onClick={() => {
										navigate({
											to: item.path,
										})
										setSidebarOpen(false);
									}}
									className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all group ${isActive
										? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
										: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
										}`}
								>
									<Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
									<div className="flex-1">
										<div className={`font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
											{item.name}
										</div>
										<div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
											{item.description}
										</div>
									</div>
								</button>
							);
						})}
					</nav>

					{/* User section */}
					<div className="p-6 border-t border-gray-200">
						<div className="flex items-center space-x-3 mb-4">
							<div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
								<span className="text-white font-semibold text-sm">JD</span>
							</div>
							<div className="flex-1">
								<div className="font-medium text-gray-900">John Doe</div>
								<div className="text-sm text-gray-500">Investor</div>
							</div>
						</div>

						<button
							onClick={handleLogout}
							className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all group"
						>
							<IconLogout className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
							<span className="font-medium">Sign Out</span>
						</button>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="lg:pl-72">
				{/* Top bar */}
				<div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
					<div className="flex items-center justify-between px-6 py-4">
						<div className="flex items-center space-x-4">
							<button
								onClick={() => setSidebarOpen(true)}
								className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
							>
								<IconMenu2 className="w-5 h-5 text-gray-600" />
							</button>

							<div>
								<h2 className="text-2xl font-bold text-gray-900">
									{activeTab?.name}
								</h2>
								<p className="text-sm text-gray-500">
									{activeTab?.description}
								</p>
							</div>
						</div>

						<div className="flex items-center space-x-3">
							<div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
								<IconMapPin className="w-4 h-4" />
								<span>Dashboard</span>
							</div>
						</div>
					</div>
				</div>

				<main className="p-6">
					<Outlet />
					<ReactQueryDevtools buttonPosition='top-right' />
					<TanStackRouterDevtools position='bottom-right' />
				</main>
			</div>
		</div>
	);
};
