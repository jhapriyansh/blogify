const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_LOCAL_URI);
    console.log(
      `Connected to MongoDB: ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
