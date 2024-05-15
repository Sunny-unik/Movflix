const Movie = require("../models/movieSchema");

const createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const movie = new Movie(movieData);
    await movie.save();
    res.send({ message: "Movie created successfully", data: movie });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send({ message: "All movies retrieved successfully", data: movies });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateMovie = async (req, res) => {
  const { movieId } = req.params;
  const updatedMovieData = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      updatedMovieData,
      { new: true }
    );
    res.send({ message: "Movie updated successfully", data: updatedMovie });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    res.send({ message: "Movie deleted successfully", data: deletedMovie });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createMovie, getAllMovies, updateMovie, deleteMovie };
