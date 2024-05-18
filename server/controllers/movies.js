const Movie = require("../models/movieSchema");
const moviesData = require("../db/movies.json");
const fetchMovies = require("../helpers/fetchData");
const Booking = require("../models/bookingSchema");

const createMovie = async (req, res, next) => {
  try {
    if (!req.decoded.admin) return res.status(401).send("Unauthorized");
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
  if (!req.decoded.admin) return res.status(401).send("Unauthorized");
  const { id } = req.params;
  const { Title, Type, Poster, Year } = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { Title, Type, Poster, Year },
      { new: true }
    );
    res.send({ message: "Movie updated successfully", data: updatedMovie });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  if (!req.decoded.admin) return res.status(401).send("Unauthorized");
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    const deletedBookings = await Booking.deleteMany({ movieId: id });
    res.send({
      message: "Movie deleted successfully",
      data: [deletedMovie, deletedBookings],
    });
  } catch (error) {
    next(error);
  }
};

const feedMovies = async (req, res) => {
  try {
    const data = (await fetchMovies(req.body.search)) || moviesData;
    const insertedMovies = await Movie.insertMany(
      data.map((o) => getDefaultShowTimings(o))
    );
    res.json({ message: "Movies inserted successfully", insertedMovies });
  } catch (error) {
    console.error("Error inserting movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

function getDefaultShowTimings(movieData) {
  const startTime = new Date(
    Date.now() + parseInt(Math.random() * 10) * 24 * 60 * 60 * 1000
  );
  const endTime = new Date(
    +startTime + 120 * 60000 + parseInt(Math.random() * 10) * 60000
  );
  const hallsList = [
    "PVR INOX",
    "SRS Cinema",
    "Big Cinemas",
    "Esquare Talkies",
    "Cinepolis",
    "Mukta A2 Cinemas",
    "SPI Cinemas",
    "MovieTime Cinemas",
    "Carnival Cinemas",
    "Miraj Cinemas",
  ];
  const totalSeats = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
  return {
    ...movieData,
    showTimings: {
      startTime,
      endTime,
      hall: hallsList[Math.floor(Math.random() * 10)],
      totalSeats,
      bookedSeats: 0,
      bookingIds: [],
    },
  };
}

module.exports = {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovie,
  feedMovies,
};
