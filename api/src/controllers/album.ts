import { Request, Response, NextFunction, query } from 'express'

import AlbumModel from '../models/Album'
import AlbumService from '../services/album'
import { BadRequestError } from '../helpers/apiError'
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
  console.log(`Album Request from ${req.user}`)
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
    console.log(album)
    const createdAlbum = await AlbumService.create(album)
    console.log(createdAlbum)
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
    const { days } = req.body
    const { email, role }: any = req.user
    const user = (await UserService.findByEmail(email)) as UserDocument
    console.log(user)
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
    const { email, role }: any = req.user
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
