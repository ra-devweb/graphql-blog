import bcrypt from 'bcrypt'

import getUserId from '../utils/getUserId.mjs'
import generateToken from '../utils/generateToken.mjs'
import hashPassword from '../utils/hashPassword.mjs'

const Mutation = {
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login.')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login.')
        }

        const token = generateToken(user.id)

        return {
            token,
            user
        }
    },
    async createUser(parent, args, { prisma }, info) {

        const emailTaken = await prisma.exists.User({ email: args.data.email})

        if (emailTaken){
            throw new Error('Email Taken.')
        }

        const password = await hashPassword(args.data.password)

        const newUser = {
            ...args.data,
            password
        }

        const user = await prisma.mutation.createUser({ data: newUser })

        const token = generateToken(user.id)

        return {
            token,
            user
        }

    },
    async updateUser(parent, args, { prisma, request }, info) {
        
        const userId = await getUserId(request)

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({where: {id: userId}, data: args.data}, info)
    },
    async deleteUser(parent, args, { prisma, request }, info) {

        const userId = await getUserId(request)

        return prisma.mutation.deleteUser( { where : { id: userId } }, info)
    },
    async createPost(parent, args, { prisma, request }, info) {

        const userId = await getUserId(request)

        const post = {
            title: args.data.title,
            content: args.data.content,
            snippet: args.data.snippet,
            published: args.data.published,
            author: {
                connect: {id: userId}
            }
        }

        return prisma.mutation.createPost({data: post}, info)
    },
    async updatePost(parent, args, { prisma, request }, info) {

        const userId = await getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        const postPublished = await prisma.exists.Post({
            id: args.id,
            published: true
        })

        if (!postExists) {
            throw new Error('Unable to update post')
        } 

        if (postPublished && args.data.published === false) {
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id: args.id
                    }
                }
            })
        }

        return prisma.mutation.updatePost({ where: { id: args.id }, data: args.data}, info)

    },
    async deletePost(parent, args, { prisma, request }, info) {
        
        const userId = await getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists) throw new Error('Unable to delete post')

        return prisma.mutation.deletePost({ where: { id: args.id } }, info)

    },
    async createComment(parent, args, { prisma, request }, info) {
        
        const userId = await getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.data.post,
            published: true
        })

        if (!postExists) {
            throw new Error('Post not found')
        }

        const comment = {
            text: args.data.text,
            author: {
                connect: {
                    id: userId
                }
            },
            post: {
                connect: {
                    id: args.data.post
                }
            }
        }

        return prisma.mutation.createComment({ data: comment }, info)

    },
    async updateComment(parent, args, { prisma, request }, info) {
        
        const userId = await getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists) throw new Error('Unable to update comment')

        return prisma.mutation.updateComment({ where: { id: args.id }, data: args.data }, info)

    },
    async deleteComment(parent, args, { prisma, request }, info) {
        
        const userId = await getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists) throw new Error('Unable to delete comment')

        return prisma.mutation.deleteComment({ where: { id: args.id } }, info)
    }
}

export { Mutation as default }