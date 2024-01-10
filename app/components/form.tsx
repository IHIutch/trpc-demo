"use client"

import { useCreatePost } from '@/utils/react-query/post'
import { PostOptions } from '@/utils/zod/schema'
import * as React from 'react'

type Option = (typeof PostOptions)[number]

export default function Form() {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [order, setOrder] = React.useState('')
  const [isFeatured, setIsFeatured] = React.useState('')
  const [status, setStatus] = React.useState<Option>(PostOptions[0])

  const { mutateAsync: handleCreatePost } = useCreatePost()

  const handleSubmit = ((e: React.FormEvent) => {
    e.preventDefault()
    handleCreatePost({
      payload: {
        isFeatured: isFeatured === 'on',
        order: Number(order),
        title,
        content,
        status
      }
    })
  })

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='space-y-2'>
      <div>
        <label htmlFor="title" className="block">Title</label>
        <input onChange={(e) => setTitle(e.target.value)} id="title" type="text" name='title' />
      </div>
      <div>
        <label htmlFor="content" className="block">Content</label>
        <textarea onChange={(e) => setContent(e.target.value)} id="content" name='content' />
      </div>
      <div>
        <label htmlFor="order" className="block">Post Order</label>
        <input onChange={(e) => setOrder(e.target.value)} id="order" type='number' name='order' />
      </div>
      <div>
        <label htmlFor="isFeatured">Featured?</label>
        <input onChange={(e) => setIsFeatured(e.target.value)} id="isFeatured" type='checkbox' name='isFeatured' />
      </div>
      <div>
        <label htmlFor="status" className="block">Status</label>
        <select onChange={(e) => setStatus(e.target.value as Option)} id="status" name='status' required>
          <option>-- Choose --</option>
          {PostOptions.map(opt => (
            <option key={opt} value={opt}>Draft</option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit" className="bg-black text-white rounded p-2" >Submit</button>
      </div>
    </form>)
}
