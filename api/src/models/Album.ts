import mongoose, { Document, isValidObjectId } from 'mongoose'

// Should returndate
export type AlbumDocument = Document & {
  name: string
  ISWC: number
  artist: string
  collaborators: string[]
  genres: string[]
  publishedYear: number
  isAvailable: boolean
  lastBorrowedDate: Date | null
  returnDate: Date | null
  _borrowerId: mongoose.Types.ObjectId | null
}

// Additional validation could be added in the model here, certain number of genres
const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true,
  },
  ISWC: {
    type: Number,
    index: true,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  collaborators: [String],
  genres: [String],
  publishedYear: {
    type: Number,
    required: true,
    max: new Date().getFullYear(),
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  lastBorrowedDate: {
    type: Date,
    default: null,
  },
  returnDate: {
    type: Date,
    default: null,
  },
  _borrowerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    default: null,
  },
})

export default mongoose.model<AlbumDocument>('Album', albumSchema)
