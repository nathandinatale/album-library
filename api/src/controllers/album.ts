import { Request, Response, NextFunction, query } from 'express'

import AlbumModel from '../models/Album'
import AlbumService from '../services/album'
import { BadRequestError, InternalServerError } from '../helpers/apiError'
import UserService from '../services/user'
import { UserDocument } from '../models/User'

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
}

export const findSpecific = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset, count }: any = req.query
    res.json(await AlbumService.findSpecific(parseInt(offset), parseInt(count)))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
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
      isAvailable = true,
      lastBorrowedDate = null,
      returnDate = null,
      _borrowerId = null,
    } = req.body
    const album = new AlbumModel({
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
    })
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

export const borrowAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { days } = req.body
    if (!req.user) {
      next(
        new InternalServerError('Something went wrong during authentication')
      )
    }
    const { email }: any = req.user
    const user = (await UserService.findByEmail(email)) as UserDocument
    const albumId = req.params.albumId
    const borrowedAlbum = await AlbumService.borrowAlbum(
      user._id.toString(),
      albumId,
      days
    )
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
    if (!req.user) {
      next(
        new InternalServerError('Something went wrong during authentication')
      )
    }
    const { email }: any = req.user
    const user = (await UserService.findByEmail(email)) as UserDocument
    const albumId = req.params.albumId
    const returnedAlbum = await AlbumService.returnAlbum(
      user._id.toString(),
      albumId
    )
    res.json(returnedAlbum)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
