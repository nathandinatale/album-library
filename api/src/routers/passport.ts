import express from 'express'
import verifyAuth from '../middlewares/verifyAuth'
import passport from 'passport'

import { generateJwt } from '../controllers/passport'

const router = express.Router()

router.post(
  '/',
  passport.authenticate('google-id-token', { session: false }),
  generateJwt
)

export default router
