const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database is connected');
  } catch (err) {
    console.log(err);
    throw new Error('Error in conexion database');
  }
};

module.exports = {
  dbConnection,
};
