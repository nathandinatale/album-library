import express from 'express'
import verifyAuth from '../middlewares/verifyAuth'

import {
  createUser,
  checkToken,
  findAll,
  findById,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = express.Router()

router.use(verifyAuth)

router.get('/', findAll)
router.get('/:userId', findById)

router.put('/:userId', updateUser)

router.delete('/:albumId', deleteUser)

router.post('/', createUser)
router.post('/check', checkToken)

export default router
