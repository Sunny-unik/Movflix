const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    const { host, port, name } = conn.connection;
    console.log(`MongoDB Connected host: ${host}, port: ${port}, DB: ${name}`);
  } catch (err) {
    console.log("Error in DB connection", err);
  }
}

module.exports = connectDB;
