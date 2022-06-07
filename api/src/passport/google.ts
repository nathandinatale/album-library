import GoogleStrategy from 'passport-google-id-token'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'

const isAdmin = (domain: string | undefined) => {
  if (domain !== 'integrify.io') return false
  return true
}

const loginWithGoogle = () => {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: {
        // google ID tokens don't always contain "family_name" and domains
        payload: {
          name: string
          email: string
          family_name?: string
          hd?: string
        }
      },
      googleID: string,
      done: Function
    ) => {
      try {
        let user = await UserService.findByEmail(parsedToken.payload.email)

        if (!user) {
          user = {
            firstName: parsedToken.payload.name,
            lastName: parsedToken.payload.family_name,
            email: parsedToken.payload.email,
            role: isAdmin(parsedToken.payload.hd) ? 'ADMIN' : 'USER',
          } as UserDocument
          console.log(user)
          const newUser = new User(user)
          await UserService.create(newUser)
        }
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}

export default loginWithGoogle
