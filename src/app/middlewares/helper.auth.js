const User = require('../../domain/models/user');
const Jwt = require('jsonwebtoken')
const { AuthenticationError } = require('../errors/custom-error-handler-global')


const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new AuthenticationError('Authentication invalid.')
    }

    const token = authHeader.split(' ')[1]
    try{
        const payload = Jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        next()
    }catch(err){
        throw new AuthenticationError('Authentication invalid')
    }
}

module.exports = auth




