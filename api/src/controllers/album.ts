import { Request, Response, NextFunction } from 'express'

import Album from '../models/Album'
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
  // Explicitly destructuring the required properties and spreading the rest should the JSON request body have any
  try {
    const {
      name,
      ISWC,
      artist,
      genres,
      publishedYear,
      ...remainingAlbumProperties
    } = req.body

    const album = new Album({
      name,
      ISWC,
      artist,
      genres,
      publishedYear,
      ...remainingAlbumProperties,
    })

    await AlbumService.create(album)
    res.json(album)
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
