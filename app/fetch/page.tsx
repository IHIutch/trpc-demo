"use client"

import * as React from "react"
import Form from "../components/form"

export default function Fetch() {
  const [posts, setPosts] = React.useState([])

  React.useEffect(() => {
    async function getPosts() {
      const data = await fetch("api/trpc/post.getAll")
      const postsJSON = await data.json()

      console.log({ postsJSON })
      setPosts(postsJSON.result.data.json)
    }
    getPosts()
  })

  return (
    <div className='mx-auto max-w-5xl flex mt-20 '>
      <div className="w-1/2">
        <div className="fixed top-20">
          <Form />
        </div>
      </div>

      <pre className="w-1/2 overflow-y-auto">
        <div>{JSON.stringify(posts, null, 2)}</div>
      </pre>
    </div>
  )
}
