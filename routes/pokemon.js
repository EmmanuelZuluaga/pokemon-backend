const express = require('express');

const {
    getPaginationPokemons,
    getPokemonById
  } = require('../controllers/pokemon_controller');


const router = express();
router.disable('x-powered-by');

router.get('/pagination/:initNumPokemos',getPaginationPokemons);
router.get('/:idPokemon',getPokemonById);

module.exports = router;