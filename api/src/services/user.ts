import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

// returns null instead of throwing an error to indicate to passport middleware that a user
// should be created with this email
const findByEmail = async (userEmail: string): Promise<UserDocument | null> => {
  const foundUser = await User.findOne({ email: userEmail })
  if (!foundUser) {
    console.log(`Creating new user with email ${userEmail}`)
  }
  return foundUser
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })
  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const deletedUser = await User.findByIdAndDelete(userId)
  if (!deletedUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return deletedUser
}

export default {
  create,
  findAll,
  findById,
  findByEmail,
  update,
  deleteUser,
}
