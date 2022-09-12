const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../config/config');

// Configure the strategy for use by Passport.
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

// Strategy for JWT authentication (JWT is a JSON Web Token).
const JwtStrategy = new Strategy(options, (payload, done) => done(null, payload));

module.exports = JwtStrategy;
