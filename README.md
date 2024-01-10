# TRPC + NextJS v14 Demo

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File Structure

```text
.
├── app  # <-- this is where the Next.js application lives
│   └── api/trpc/[trpc]/route.ts # <-- this is the dynamic tRPC HTTP handler
│   ├── fetch
|   |   └── page.tsx  # <-- an example of a traditional fetch request
│   └── layout.tsx # <-- the topmost layer of our Next.js app. We add the providers here
│   └── page.tsx # <-- the homepage
│   └── provider.tsx # <-- where our providers are defined
├── prisma  # <-- if prisma is added
│   └── schema.prisma # <-- this defines the database schema
├── server
│   ├── routers
│   │   ├── posts.ts  # <-- sub routers
│   │   └── [..]
│   └── index.ts # <-- main app router
├── utils
|   ├── prisma
|   |   └── index.ts  # <-- this is the global prisma object is initialized
|   ├── react-query
|   |   └── post.ts  # <-- any custom react-query hooks, these are optional, but useful
|   ├── trpc
|   |   ├── client.ts  # <-- where the client side trpc "factory" is defined
|   |   ├── index.ts  # <-- the global trpc object is initialized
|   |   └── posts.ts  # <-- where the server side trpc "factory" is defined
|   └── zod
|       └── schema.ts  # <-- where the zod schemas are defined
└── [..]
```

## Resources

- [tRPC](https://trpc.io/)
- [React Query (v4)](https://tanstack.com/query/v4/docs/react/overview)
- [Zod](https://zod.dev/)
- [Prisma](https://www.prisma.io/nextjs)
- [SuperJSON](https://trpc.io/docs/server/data-transformers#using-superjson)
