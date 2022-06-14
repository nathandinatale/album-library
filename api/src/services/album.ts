import Album, { AlbumDocument } from '../models/Album'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'
import mongoose, { isValidObjectId } from 'mongoose'
import e from 'express'

const findAll = async (): Promise<AlbumDocument[]> => {
  return Album.find()
}

const findById = async (albumId: string): Promise<AlbumDocument> => {
  const foundAlbum = await Album.findById(albumId)
  if (!foundAlbum) {
    throw new NotFoundError(`Album ${albumId} not found`)
  }
  return foundAlbum
}

const create = async (album: AlbumDocument): Promise<AlbumDocument> => {
  return album.save()
}

const update = async (
  albumId: string,
  update: Partial<AlbumDocument>
): Promise<AlbumDocument | null> => {
  const foundAlbum = await Album.findByIdAndUpdate(albumId, update, {
    new: true,
  })
  return foundAlbum
}

const deleteAlbum = async (albumId: string): Promise<AlbumDocument | null> => {
  const deletedAlbum = Album.findByIdAndDelete(albumId)
  if (!deletedAlbum) {
    throw new NotFoundError(`Album ${albumId} not found`)
  }
  return deletedAlbum
}

// Some of this is borrowed from Anastasiia's PR
const borrowAlbum = async (
  userId: string,
  albumId: string,
  days: number
): Promise<AlbumDocument | null> => {
  const borrowDate = new Date()
  const returnDate = new Date()
  returnDate.setDate(returnDate.getDate() + days)

  const albumToBorrow = await Album.findById(albumId)
  if (!albumToBorrow) {
    throw new NotFoundError(`Album ${albumId} not found`)
  }

  if (!albumToBorrow.isAvailable) {
    throw new BadRequestError(`Album ${albumId} is not available for renting!`)
  }

  const update: Partial<AlbumDocument> = {
    isAvailable: false,
    _borrowerId: mongoose.Types.ObjectId(userId),
    lastBorrowedDate: borrowDate,
    returnDate: returnDate,
  }

  const borrowedAlbum = await Album.findByIdAndUpdate(albumId, update, {
    new: true,
  })
  if (!borrowedAlbum) {
    throw new InternalServerError(`Album ${albumId} was not updated`)
  }

  return borrowedAlbum
}

const returnAlbum = async (
  userId: string,
  albumId: string
): Promise<AlbumDocument | null> => {
  const albumToReturn = (await Album.findById(albumId)) as AlbumDocument
  console.log(albumToReturn)
  if (!albumToReturn) {
    throw new NotFoundError(`Album ${albumId} not found`)
  }
  if (albumToReturn.isAvailable) {
    throw new Error('Can\'t return an album that is available!')
  }

  if (albumToReturn._borrowerId) {
    const borrowerId = albumToReturn._borrowerId.toString()
    console.log(borrowerId)
    console.log(userId)
    console.log(borrowerId === userId)
    if (borrowerId.valueOf() !== userId.valueOf()) {
      throw new BadRequestError(
        `The user with ID ${userId} did not rent this album!!`
      )
    }
  }

  const update: Partial<AlbumDocument> = {
    isAvailable: true,
    _borrowerId: null,
    lastBorrowedDate: null,
    returnDate: null,
  }

  const returnedAlbum = await Album.findByIdAndUpdate(albumId, update, {
    new: true,
  })
  if (!returnedAlbum) {
    throw new BadRequestError(`Album ${albumId} was not returned`)
  }

  return returnedAlbum
}

export default {
  findAll,
  findById,
  create,
  update,
  deleteAlbum,
  borrowAlbum,
  returnAlbum,
}
