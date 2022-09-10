const path = require('path');
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');
const bodyParser = require('body-parser');

class Server {
  constructor() {
    
    this.app = express();
    this.app.use(bodyParser.json({ limit: '500mb', extended: true }));
    this.app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
    this.app.disable('x-powered-by');
    this.app.use(express.urlencoded({ extended: true }));
    this.port = process.env.PORT;
    this.paths = {
    //  auth: '/api/auth',
       pokemons: '/api/pokemons',
    };
    //Conectar a DB
   // this.connectDB();
    //Middlewares
   // this.middlewares();
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
  }

  routes() {
  //  this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.pokemons, require('../routes/pokemon'));

    this.app.get('***', (req, res) => {
      res.sendFile(path.join(__dirname, 'public/index.html'));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}

module.exports = Server;