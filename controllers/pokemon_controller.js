const { response, request } = require('express');
const axios = require('axios');


const getAllPokemos = async (req = request, res = response) => {
    await axios.get('https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=86400&start=')
    .then(responseAxios => {
     Promise.all(
        
      );
     
    })
  };

  
module.exports = {
    getAllPrices,
    getSellByPrice
  };