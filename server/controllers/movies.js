const Movie = require("../models/movieSchema");

const createMovie = async (req, res, next) => {
  try {
    const movieData = req.body;
    const movie = new Movie(movieData);
    await movie.save();
    res.send({ message: "Movie created successfully", data: movie });
  } catch (error) {
    next(error);
  }
};

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.send({ message: "All movies retrieved successfully", data: movies });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    res.send({ message: "Movie retrieved successfully", data: movie });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
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
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    res.send({ message: "Movie deleted successfully", data: deletedMovie });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovie,
};
