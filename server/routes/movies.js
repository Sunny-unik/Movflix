const express = require("express");
const {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovie);
router.put("/", updateMovie);
router.delete("/", deleteMovie);

module.exports = router;
