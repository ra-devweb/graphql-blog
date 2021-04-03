import { extractFragmentReplacements } from 'prisma-binding'

import Query from './Query.mjs'
import Mutation from './Mutation.mjs'
import Subscription from './Subscription.mjs'
import User from './User.mjs'
import Post from './Post.mjs'
import Comment from './Comment.mjs'

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
}

const fragmentReplacement = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacement }