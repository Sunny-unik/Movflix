const Booking = require("../models/bookingSchema");
const Movie = require("../models/movieSchema");

const addBooking = async (req, res, next) => {
  try {
    const { userId } = req.decoded;
    const { movieId, seats, paymentMethod, showName } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) throw new Error("Movie not found");
    if (typeof seats !== "number" || seats <= 0) throw new Error("");

    const currentShow = movie.showTimings.find((s) => s.hall === showName);
    const availableSeats = currentShow.totalSeats - currentShow.bookedSeats;
    if (seats > availableSeats)
      return res.send({ message: "Unable to proceed your request" });
    function* increment(n = 0) {
      while (1) {
        n = n + 1;
        yield n;
      }
    }
    const getIncremented = increment(currentShow.bookedSeats);
    const seatsGraph = Array.from(
      { length: seats },
      () => getIncremented.next().value
    );

    const booking = new Booking({
      userId,
      movieId,
      seats: seatsGraph,
      paymentMethod,
    });
    await booking.save();
    currentShow.bookedSeats = currentShow.bookedSeats + seats;
    currentShow.bookingIds.push(booking._id);
    await movie.save();
    res.send({ message: "Seat booked successfully", data: { booking, movie } });
  } catch (error) {
    console.log("error message ", error.message);
    next(error);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate(
      "movieId"
    );
    res.send({
      data: bookings,
      message: "Your bookings retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addBooking, getUserBookings };
