const express = require("express");
const { addBooking } = require("../controllers/bookings");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, addBooking);

module.exports = router;
