import { caller } from '@/utils/trpc/server'
import Form from './_components/form'
import PostData from './_components/post-data'

export default async function Home() {

  const posts = await caller.post.getAll()

  return (
    <div style={{ maxWidth: '1280px', marginLeft: '0 auto', display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <Form />
      </div>
      <div style={{ width: '50%' }}>
        <PostData initialData={posts} />
      </div>
    </div>
  )
}