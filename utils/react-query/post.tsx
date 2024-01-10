import { type z } from "zod"
import { trpc } from "../trpc/client"
import { type CreatePostSchema } from "../zod/schema"

export const useGetAllPosts = () => {
  const { isLoading, isError, isSuccess, data, error } = trpc.post.getAll.useQuery()
  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

type PayloadType = z.infer<typeof CreatePostSchema>

export const useCreatePost = () => {
  const { post: postUtils } = trpc.useUtils()
  const { mutateAsync, isLoading, isError, isSuccess, data, error } =
    trpc.post.create.useMutation({
      onMutate: async ({ payload }: { payload: PayloadType }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await postUtils.getAll.cancel()
        // Store the 'stale' data in case our request fails
        const previous = postUtils.getAll.getData()
        // Optimistically update the local data cache
        // Its an array because our 'query key' is fetching "all posts". So we want to add our new item that array
        postUtils.getAll.setData(
          undefined,
          (old) => {
            return old ? [
              ...old,
              {
                ...payload,
                id: -1, // We're adding these fields manually, because our markup expects them to be there but they havent been assigned by the db yet
                createdAt: new Date(),
                updatedAt: new Date()
              }
            ] : []
          }
        )
        return { previous, updated: payload }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        // Set the local data cache back to the 'stale' data, because our request failed
        postUtils.getAll.setData(
          undefined,
          context?.previous
        )
      },
      // Always refetch after error or success:
      onSettled: () => {
        // By invalidating the cache, we'll fetch the latest data, getting the true id, createdAt, updatedAt fields
        postUtils.getAll.invalidate()
      },
    })
  return {
    mutateAsync,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}
