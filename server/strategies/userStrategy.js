const User = require("../models/Users")
const { secretKey } = require("../config/keys")

let JwtStrategy = require("passport-jwt").Strategy
ExtractJwt = require("passport-jwt").ExtractJwt

let opts = {}
opts.secretOrKey = secretKey
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
module.exports = (passport) => {
  passport.use(
    "userStrategy",
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload.data.id }, (err, user) => {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
          // or you could create a new account
        }
      })
    })
  )
}
