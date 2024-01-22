'use client'

import { RouterInputs } from '@/server'
import { trpc } from '@/utils/trpc/client'
import { PostOptions, PostSchema } from '@/utils/zod/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const FormPayload = PostSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})
type FormData = z.infer<typeof FormPayload>

export default function Form() {
    const { post: postUtils } = trpc.useUtils()
    const { mutateAsync: handleCreatePost } = trpc.post.create.useMutation({
        onMutate: async ({
            payload,
        }: {
            payload: RouterInputs['post']['create']['payload']
        }) => {
            await postUtils.getAll.cancel()
            const previous = postUtils.getAll.getData()
            postUtils.getAll.setData(undefined, (old) => [
                ...(old || []),
                {
                    ...payload,
                    id: -1, // We don't know what the id will be, but we need one to bet set
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ])
            return { previous, updated: payload }
        },
        onError: (err, updated, context) => {
            postUtils.getAll.setData(undefined, context?.previous)
        },
        onSettled: () => {
            postUtils.getAll.invalidate()
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormPayload),
        progressive: true,
    })

    const onSubmit: SubmitHandler<FormData> = async (form) => {
        await handleCreatePost({
            payload: form,
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    aria-invalid={errors.title ? 'true' : 'false'}
                    aria-errormessage={errors.title ? 'title-error' : undefined}
                    {...register('title')}
                />
                {errors.title ? <p id="title-error">{errors.title?.message}</p> : null}
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    aria-invalid={errors.content ? 'true' : 'false'}
                    aria-errormessage={errors.content ? 'content-error' : undefined}
                    {...register('content')}
                />
                {errors.content ? (
                    <p id="content-error">{errors.content?.message}</p>
                ) : null}
            </div>
            <div>
                <label htmlFor="order">Post Order</label>
                <input
                    id="order"
                    aria-invalid={errors.order ? 'true' : 'false'}
                    aria-errormessage={errors.order ? 'order-error' : undefined}
                    {...register('order')}
                    type="number"
                />
                {errors.order ? <p id="order-error">{errors.order?.message}</p> : null}
            </div>
            <div>
                <label htmlFor="isFeatured">Featured?</label>
                <input
                    id="isFeatured"
                    aria-invalid={errors.isFeatured ? 'true' : 'false'}
                    aria-errormessage={errors.isFeatured ? 'isFeatured-error' : undefined}
                    {...register('isFeatured')}
                    type="checkbox"
                />
                {errors.isFeatured ? (
                    <p id="isFeatured-error">{errors.isFeatured?.message}</p>
                ) : null}
            </div>
            <div>
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    aria-invalid={errors.status ? 'true' : 'false'}
                    aria-errormessage={errors.status ? 'status-error' : undefined}
                    {...register('status', { required: true })}
                >
                    <option value="">-- Choose --</option>
                    {PostOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                {errors.status ? (
                    <p id="status-error">{errors.status?.message}</p>
                ) : null}
            </div>
            <div>
                <button type="submit" className="rounded bg-black p-2 text-white">
                    Submit
                </button>
            </div>
        </form>
    )
}