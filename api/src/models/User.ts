import mongoose, { Document } from 'mongoose'

export type User = {
  firstName: string
  lastName: string
  email: string
  role: string
}

export type UserDocument = Document & User

// lastName false because google ID token may not contain a lastname
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
    required: true,
  },
  lastName: {
    type: String,
    index: true,
    required: false,
    default: null,
  },
  email: {
    type: String,
    index: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
