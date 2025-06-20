import React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AstroGlobal } from 'astro'

export const Route = createRootRouteWithContext<{
	astroContext: AstroGlobal | undefined
	queryClient: QueryClient
}>()({
	component: Component,
})

function Component() {
	return (
		<>
			<div className='flex flex-col md:flex-row gap-4 md:gap-8 p-8'>
				<div className='flex gap-2 flex-col'>
					<div>
            <h3 className='font-bold'>Farmday Portal</h3>
						<ul>
							<li>
								<Link className='text-blue-500' to='/portal' reloadDocument>
									Home
								</Link>
							</li>
              <li>
                <Link className='text-blue-500' to='/portal/performance' reloadDocument>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link className='text-blue-500' to='/portal/account' reloadDocument>
                  Account
                </Link>
              </li>
						</ul>
					</div>
				</div>
				<div className='bg-gray-300 flex-[0_0_1px]' />
				<Outlet />
			</div>
			<ReactQueryDevtools buttonPosition='top-right' />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	)
}
