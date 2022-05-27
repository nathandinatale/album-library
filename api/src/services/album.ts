import Album, { AlbumDocument } from '../models/Album'
import { NotFoundError } from '../helpers/apiError'

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

/*
const lendAlbum = async (userId: string, albumId: string): Promise<AlbumDocument | null> => {
  const borrowedAlbum = Album.findById(albumId)
  if (!borrowedAlbum) {
    throw new NotFoundError(`Album ${albumId} not found`)
  }
}
*/

export default {
  findAll,
  findById,
  create,
  update,
  deleteAlbum,
}
