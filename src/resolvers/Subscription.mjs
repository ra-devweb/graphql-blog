import getUserId from '../utils/getUserId.mjs'

const Subscription = {
    post: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.post({
                where: {
                    node: {
                        published: true
                    }
                }
            }, info)
        }
    },
    comment: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: args.postId
                        }
                    }
                }
            }, info)
        }
    },
    myPosts: {
        async subscribe(parent, args, { prisma, request }, info) {
            const userId = await getUserId(request)

            return prisma.subscription.post({
                where: {
                    node: {
                        author: {
                            id: userId
                        }
                    }
                }
            }, info)
        }
    }
}

export { Subscription as default }