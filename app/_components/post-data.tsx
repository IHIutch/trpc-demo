'use client'

import { RouterOutputs } from '@/server'
import { trpc } from '@/utils/trpc/client'

export default function PostData({ initialData }: { initialData?: RouterOutputs['post']['getAll'] }) {
    const { data: posts } = trpc.post.getAll.useQuery(undefined, {
        initialData,
        refetchOnMount: initialData ? false : true
    })

    return (
        <pre>
            <div>{JSON.stringify(posts, null, 2)}</div>
        </pre>
    )
}