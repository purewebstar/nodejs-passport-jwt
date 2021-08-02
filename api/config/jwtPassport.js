import jwtPass from 'passport-jwt'
import dotenv from 'dotenv'
dotenv.config()

const JwtPassport = jwtPass.Strategy
const ExtractJwt = jwtPass.ExtractJwt

export const initPassport = (passport) =>{
    passport.use(new JwtPassport({
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
     }, (payload, done) =>{
         done(null, payload)
    }))
}