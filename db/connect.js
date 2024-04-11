const mongoose = require("mongoose");

const connectDB = async() => {
  try {
    let mon = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database is connected with ${mon.connection.name}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB; 
