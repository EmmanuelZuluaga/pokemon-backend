require('dotenv').config();

const config = {

  jwtSecret: process.env.JWT_KEY,

};

module.exports = { config };
