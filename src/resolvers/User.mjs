import getUserId from '../utils/getUserId.mjs'

const User = {
    posts: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { prisma }, info) {
            return prisma.query.posts({
                where: {
                    published: true,
                    author: {
                        id: parent.id
                    }
                }
            }, info)
        }
    },
    email: {
        fragment: 'fragment userId on User { id }',
        async resolve(parent, args, { request }, info) {
            const userId = await getUserId(request, false)

            if (userId && parent.id === userId) {
                return parent.email
            }
            
            return null
        }
    }
}

export { User as default }