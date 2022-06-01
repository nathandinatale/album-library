import Album, { AlbumDocument } from '../models/Album'
import { NotFoundError } from '../helpers/apiError'
import mongoose from 'mongoose'

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
    throw new Error(`Album ${albumId} was not updated`)
  }

  return borrowedAlbum
}

const returnAlbum = async (
  userId: string,
  albumId: string
): Promise<AlbumDocument | null> => {
  const albumToReturn = await Album.findById(albumId)
  if (!albumToReturn) {
    throw new NotFoundError(`Album ${albumId} not found`)
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
    throw new Error(`Album ${albumId} was not returned`)
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
