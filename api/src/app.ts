import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'

import movieRouter from './routers/movie'
import albumRouter from './routers/album'
import userRouter from './routers/user'
import passportRouter from './routers/passport'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import loginWithGoogle from './passport/google'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(cors())

app.use(passport.initialize())
passport.use(loginWithGoogle())

// Set up routers
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/albums', albumRouter)
app.use('/api/v1/users', userRouter)
app.use('/google-login', passportRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
