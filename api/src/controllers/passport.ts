import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../util/secrets'
import { User } from '../models/User'

// should this be async?
export const generateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User

  const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  })

  res.json({ token, user })
}
