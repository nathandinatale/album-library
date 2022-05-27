import { UserDocument } from '../models/User'
// import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

export default {
  create,
}
