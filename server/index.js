const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDB = require("./db");
const moviesData = require("./db/movies.json");
const movieSchema = require("./models/movieSchema");
const errorHandler = require("./middleware/errorHandler");
const fetchMovies = require("./helpers/fetchData");
const moviesRoutes = require("./routes/movies");
const usersRoutes = require("./routes/users");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(bodyParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
connectDB();

app.use("/movie", moviesRoutes);
app.use("/user", usersRoutes);
app.post("/insert-movies", async (req, res) => {
  try {
    const data = (await fetchMovies()) || moviesData;
    const insertedMovies = await movieSchema.insertMany(data);
    res.json({ message: "Movies inserted successfully", insertedMovies });
  } catch (error) {
    console.error("Error inserting movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/health", (_, res) => res.send("ok"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server live on http://localhost:${port}`));
