const Jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const dotenv = require('dotenv')



const authMiddleware = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: 'Unauthorized request header format',
            status: StatusCodes.BAD_REQUEST
        })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: 'Token not provided',
            status: StatusCodes.BAD_REQUEST
        })
    }

    dotenv.config();
    try {
        const response = Jwt.verify(token, process.env.SECRET_KEY)
        console.log(response);
        req.user = { authId: response.authId, email: response.email }
        next()
    } catch (err) {
        // Handle specific error types if needed
        return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: 'Invalid access token',
            status: StatusCodes.UNAUTHORIZED
        })
    }
}

module.exports = authMiddleware
