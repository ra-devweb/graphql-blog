import jwt from 'jsonwebtoken'

const getUserId = async (request, requestAuth = true) => {
    const header =  request.request ? request.request.headers.authorization : request.connection.context.Authorization

    if (header) {

        const token = header.split(' ')[1]
    
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
    
        return decoded.userId

    } 
    
    if (requestAuth) {
        
        throw new Error('Authentication required.')
    
    } 

    return null
}

export { getUserId as  default }