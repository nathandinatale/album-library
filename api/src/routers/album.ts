import express from 'express'

import {
  createAlbum,
  findAll,
  findById,
  updateAlbum,
  deleteAlbum,
  borrowAlbum,
  returnAlbum,
} from '../controllers/album'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix

router.get('/', findAll)
router.get('/:albumId', findById)

router.post('/', createAlbum)
router.put('/:albumId', updateAlbum)

router.delete('/:albumId', deleteAlbum)

router.put('/:albumId/borrow', borrowAlbum)
router.put('/:albumId/return', returnAlbum)

export default router