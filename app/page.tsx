import { caller } from "@/utils/trpc/server"
import Form from "./components/form"
import PostData from "./components/post-data"

export default async function Home() {

  // Caller let's use access the data from the server during Server Side Rendering
  const posts = await caller.post.getAll()

  return (
    <div className='mx-auto max-w-5xl flex mt-20 '>
      <div className="w-1/2">
        <div className="fixed top-20">
          <Form />
        </div>
      </div>

      <div className="w-1/2 overflow-y-auto">
        {/* We can use that to populate initialData */}
        {/* If you dont pass initialData, you'll see that the data is blank until the client loads and initiates the first fetch */}
        <PostData initialData={posts} />
      </div>
    </div>
  )
}
