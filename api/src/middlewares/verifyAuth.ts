import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { UnauthorizedError } from '../helpers/apiError'
import { User } from '../models/User'

export default function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization || ''
    const token = auth.split(' ')[1]

    const JWT_SECRET = process.env.JWT_SECRET as string

    const user = jwt.verify(token, JWT_SECRET)
    req.user = user as User
    console.log('User verified')

    next()
  } catch (error) {
    throw new UnauthorizedError()
  }
}
