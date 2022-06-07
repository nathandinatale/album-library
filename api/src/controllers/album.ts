import { Request, Response, NextFunction } from 'express'

import Album, { AlbumDocument } from '../models/Album'
import AlbumService from '../services/album'
import { BadRequestError } from '../helpers/apiError'

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AlbumService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
  console.log(`Album Request from ${req.user}`)
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AlbumService.findById(req.params.albumId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const createAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      ISWC,
      artist,
      collaborators,
      genres,
      publishedYear,
      isAvailable,
      lastBorrowedDate,
      returnDate,
      _borrowerId,
    } = req.body
    const album = {
      name,
      ISWC,
      artist,
      collaborators,
      genres,
      publishedYear,
      isAvailable,
      lastBorrowedDate,
      returnDate,
      _borrowerId,
    } as AlbumDocument

    const createdAlbum = await AlbumService.create(album)
    res.json(createdAlbum)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const albumId = req.params.albumId
    const updatedAlbum = await AlbumService.update(albumId, update)
    res.json(updatedAlbum)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AlbumService.deleteAlbum(req.params.albumId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// change these functions to pull the userId directly from the request object after a middleware
// responsible for authentication will append it to the function
export const borrowAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, days } = req.body
    const albumId = req.params.albumId
    const borrowedAlbum = await AlbumService.borrowAlbum(userId, albumId, days)
    res.json(borrowedAlbum)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const returnAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body
    const albumId = req.params.albumId
    const returnedAlbum = await AlbumService.returnAlbum(userId, albumId)
    res.json(returnedAlbum)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
