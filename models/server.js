const path = require('path');
const express = require('express');
const cors = require('cors');
const JwtStrategy=require("../strategies/jwt.strategy")

const { dbConnection } = require('../database/config');
const bodyParser = require('body-parser');
const passport = require('passport');

class Server {
  constructor() {
    
    this.app = express();
    this.app.use(bodyParser.json({ limit: '500mb', extended: true }));
    this.app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
    this.app.disable('x-powered-by');
    this.app.use(express.urlencoded({ extended: true }));
    this.port = process.env.PORT;
    this.paths = {
       auth: '/api/auth',
       pokemons: '/api/pokemons',
       user: '/api/user',
    };
    //Conectar a DB
   this.connectDB();
    //Middlewares
   this.middlewares();
    //Rutas de mi aplicación
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Parse y lectura del body
    this.app.use(express.json());
    //Directorio público
    this.app.use(express.static('public'));
    passport.use(JwtStrategy);
    this.app.use(passport.initialize());
    
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.pokemons, require('../routes/pokemon'));
    this.app.use(this.paths.user, require('../routes/user'));
    this.app.get('***', (req, res) => {
      res.sendFile(path.join(__dirname, 'public/index.html'));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running in the port', this.port);
    });
  }
}

module.exports = Server;