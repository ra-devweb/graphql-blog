import { GraphQLServer, PubSub } from 'graphql-yoga'

import { resolvers, fragmentReplacement } from './resolvers/index.mjs'
import prisma from './prisma.mjs'

import db from './db.mjs'

const pubsub = new PubSub()

const server = new GraphQLServer({ 
    typeDefs: './src/schema.graphql', 
    resolvers,
    context(request) {
        return {
            db,
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacement
})

const port = process.env.PORT || 4000

server.start({ port }, () => {

    console.log('Started in port 4000')

})