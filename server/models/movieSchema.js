const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  year: { type: String, required: true },
  poster: { type: String, require: true },
});

const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;
