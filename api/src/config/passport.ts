import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import passportLocal from 'passport-local'

const LocalStrategy = passportLocal.Strategy
