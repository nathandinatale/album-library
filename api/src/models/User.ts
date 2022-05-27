import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
    required: true,
  },
  lastName: {
    type: String,
    index: true,
    required: true,
  },
  email: {
    type: String,
    index: true,
    required: true,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
