const Jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const dotenv = require('dotenv')

dotenv.config()

const authMiddleware = (req, res, next) => {
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

  try {
    const decodedToken = Jwt.verify(token, process.env.SECRET_KEY)
    req.user = {
      authId: decodedToken.authId,
      email: decodedToken.email
    }
    next()
  } catch (err) {
    console.log(err)
    if (err.name === 'TokenExpiredError') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: 'Token has expired',
        status: StatusCodes.UNAUTHORIZED
      })
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: err.message,
      status: StatusCodes.UNAUTHORIZED
    })
  }
}

module.exports = authMiddleware