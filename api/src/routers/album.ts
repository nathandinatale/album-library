import express from 'express'
import verifyAuth from '../middlewares/verifyAuth'
import checkAdmin from '../middlewares/checkAdmin'

import {
  createAlbum,
  findAll,
  findById,
  updateAlbum,
  deleteAlbum,
  borrowAlbum,
  returnAlbum,
  findSpecific,
} from '../controllers/album'

const router = express.Router()

router.use(verifyAuth)

router.get('/', findAll)
router.get('/search', findSpecific)
router.get('/:albumId', findById)
router.post('/', createAlbum)
router.put('/:albumId', checkAdmin, updateAlbum)

router.delete('/:albumId', checkAdmin, deleteAlbum)

router.put('/:albumId/borrow', borrowAlbum)
router.put('/:albumId/return', returnAlbum)

export default router
