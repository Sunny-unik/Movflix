const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Type: { type: String, required: true },
    Year: { type: String, required: true },
    Poster: { type: String, require: true },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;
