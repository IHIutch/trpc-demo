'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { httpBatchLink, loggerLink } from '@trpc/client'
import { trpc } from '@/utils/trpc/client'
import SuperJSON from 'superjson'

export function getBaseUrl() {
    if (typeof window !== 'undefined')
        // browser should use relative path
        return ''

    if (process.env.DEPLOYMENT_URL)
        // reference for your deployment URL
        return `https://${process.env.DEPLOYMENT_URL}`

    // local development URL
    return `http://localhost:${process.env.PORT ?? 3000}`
}

export function TrpcProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient())
    const [trpcClient] = React.useState(() =>
        trpc.createClient({
            links: [
                loggerLink({
                    enabled: () => true,
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
            transformer: SuperJSON
        }),
    )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </trpc.Provider>
    )
}