const express = require("express");
const {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovie,
} = require("../controllers/movies");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.post("/", auth, createMovie);
router.put("/:id", auth, updateMovie);
router.delete("/:id", auth, deleteMovie);

module.exports = router;
