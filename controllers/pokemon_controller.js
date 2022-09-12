const { response, request } = require('express');
const axios = require('axios');


const getPaginationPokemons = async (req = request, res = response) => {

    const { initNumPokemos } = req.params;
    let finalNumPokemos= Number(initNumPokemos)+10;
    let listPokemons=[];

    try{
        for(let i=initNumPokemos;i<=finalNumPokemos;i++){
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            .then(responseAxios => {
                listPokemons.push(responseAxios.data);     
            })
        }

        res.json({
            success: true,
            pokemons: listPokemons,
          });

    }catch(error){
        res.status(500).json({
            success: false,
            msg: 'Algo salio mal, intentelo de nuevo.',
          });
    }


 
  };


  const getPokemonById = async (req = request, res = response) => {
    const { idPokemon } = req.params;
    let pokemon={};

    try{
        
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`)
            .then(responseAxios => {
                pokemon=responseAxios.data;     
            })

        res.json({
            success: true,
            pokemon: pokemon,
          });

    }catch(error){
        res.status(500).json({
            success: false,
            msg: 'Algo salio mal, intentelo de nuevo.',
          });
    }


 
  };


  
module.exports = {
    getPaginationPokemons,
    getPokemonById
  };