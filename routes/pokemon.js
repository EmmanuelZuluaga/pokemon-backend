const express = require('express');
const passport = require('passport');
const {
    getPaginationPokemons,
    getPokemonById
  } = require('../controllers/pokemon_controller');


const router = express();
router.disable('x-powered-by');

router.get('/pagination/:initNumPokemos',
passport.authenticate('jwt', { session: false }),getPaginationPokemons);


router.get('/:idPokemon',
passport.authenticate('jwt', { session: false })
,getPokemonById);

module.exports = router;