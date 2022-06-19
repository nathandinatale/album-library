import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError } from '../helpers/apiError'
import { User } from '../models/User'

export default function checkAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { role }: any = req.user
    if (role !== 'ADMIN') {
      throw new ForbiddenError()
    }
    next()
  } catch (error) {
    next(error)
  }
}
