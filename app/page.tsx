"use client"

import Form from "./components/form"
import { useGetAllPosts } from "@/utils/react-query/post"

export default function Home() {

  const { data: posts } = useGetAllPosts()

  const reversePosts = posts?.sort((a, b) => b.id - a.id)

  return (
    <div className='mx-auto max-w-5xl flex mt-20 '>
      <div className="w-1/2">
        <div className="fixed top-20">
          <Form />
        </div>
      </div>

      <pre className="w-1/2 overflow-y-auto">
        <div>{JSON.stringify(reversePosts, null, 2)}</div>
      </pre>
    </div>
  )
}
