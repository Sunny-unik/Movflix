const express = require("express");
const { addBooking, getUserBookings } = require("../controllers/bookings");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:userId", auth, getUserBookings);
router.post("/", auth, addBooking);

module.exports = router;
