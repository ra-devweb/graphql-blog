import { Prisma } from 'prisma-binding'
import { fragmentReplacement } from './resolvers/index.mjs'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: 'mypassisme',
    fragmentReplacement
})

export { prisma as default }

