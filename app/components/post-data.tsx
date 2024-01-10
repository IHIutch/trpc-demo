"use client"
// Using "use client" here because useGetAllPosts uses a client side context/data fetching

import * as React from 'react'

import { useGetAllPosts } from "@/utils/react-query/post"
import { type RouterOutputs } from '@/server'


export default function PostData({ initialData }: { initialData?: RouterOutputs['post']['getAll'] }) {

  const { data: posts } = useGetAllPosts({ initialData })
  const reversePosts = posts?.sort((a, b) => b.id - a.id)

  return (
    <pre >
      <div>{JSON.stringify(reversePosts, null, 2)}</div>
    </pre>
  )
}
