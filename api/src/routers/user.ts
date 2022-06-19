import express from 'express'
import verifyAuth from '../middlewares/verifyAuth'
import checkAdmin from '../middlewares/checkAdmin'

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

router.get('/', checkAdmin, findAll)
router.get('/:userId', findById)

router.put('/:userId', updateUser)

router.delete('/:userId', checkAdmin, deleteUser)

router.post('/', createUser)
router.post('/check', checkToken)

export default router
