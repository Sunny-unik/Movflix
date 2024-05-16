const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Type: { type: String, required: true },
    Year: { type: String, required: true },
    Poster: { type: String, require: true },
    showTimings: {
      type: [
        {
          startTime: { type: Date },
          endTime: { type: Date },
          hall: { type: String },
          totalSeats: { type: Number },
          bookedSeats: { type: Number },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;
