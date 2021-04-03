import getUserId from '../utils/getUserId.mjs'

const Query = {
    users: (parent, args, { prisma }, info) => {

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }

        if (args.query) {
            opArgs.where = {
                OR: [
                    {name_contains: args.query}
                ]
            }
        }

        return prisma.query.users(opArgs, info)

    },
    posts: (parent, args, { prisma }, info) => {

        const opArgs = {
            first: args.first,
            last: args.last,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                published: true
            }
        }

        if (args.query) {
            opArgs.where.OR = [
                {title_contains: args.query},
                {content_contains: args.query}
            ]
        }

        return prisma.query.posts(opArgs, info)
    },
    async myPosts(parent, args, { prisma, request }, info) {
        const userId = await getUserId(request)

        const opArgs = {
            first: args.first,
            last: args.last,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                author: {
                    id: userId
                }
            }
        }

        if (args.query) {
            opArgs.where.OR = [
                {title_contains: args.query},
                {content_contains: args.query}
            ]
        }

        return prisma.query.posts(opArgs, info)
    },
    async post(parent, args, { prisma, request }, info) {
        const userId = await getUserId(request, false)

        const post = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [
                    {
                        published: true
                    },
                    {
                        author: {
                            id: userId
                        }
                    }
                ]
            }
        }, info)

        if (post.length === 0) {
            throw new Error('Post not found')
        }

        return post[0]
    },
    comments: (parent, args, { prisma }, info) => {

        return prisma.query.comments({
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }, info)

    },
    async me(parent, args, { prisma, request }, info) {

        const userId = await getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        }, info)
    },
}

export { Query as default }