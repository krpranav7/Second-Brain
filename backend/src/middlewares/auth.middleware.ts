import jwt from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'
import { userModel } from '../models/user.model.js'
import type { AuthTokenPayload } from '../types/jwt.types.js'

export async function authUserMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({
      message: 'Please login first'
    })
  }

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET is not defined')
    const decoded = jwt.verify(token, secret) // type of jwt.verify is string | JwtPayload, so at compile time, TS treats decoded as both possibilies at once, and only lets you do things that are safe for both.

    if (typeof decoded === 'string') {
      return res.status(401).json({
        message: 'Invalid token payload'
      })
    }
    const payload = decoded as AuthTokenPayload
    const user = await userModel.findById(payload.id)
    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      })
    }

    req.user = user
    next()
  } catch (err) {
    console.error('Auth middleware error: ', err)
    return res.status(401).json({
      message: 'Invalid or expired token'
    })
  }
}
