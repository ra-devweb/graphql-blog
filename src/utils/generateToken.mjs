import jwt from 'jsonwebtoken'

const generateToken =  (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_JWT, { expiresIn: '7 days'})
}

export { generateToken as default }