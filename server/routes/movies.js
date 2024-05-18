const express = require("express");
const {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovie,
} = require("../controllers/movies");

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
