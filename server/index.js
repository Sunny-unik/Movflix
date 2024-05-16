const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDB = require("./db");
const errorHandler = require("./middleware/errorHandler");
const moviesRoutes = require("./routes/movies");
const usersRoutes = require("./routes/users");
const bookingsRoutes = require("./routes/bookings");
const cookieParser = require("cookie-parser");
const { feedMovies } = require("./controllers/movies");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(bodyParser());
app.use(
  cors({
    origin: JSON.parse(process.env.ALLOWED_ORIGINS),
    credentials: true,
  })
);
app.use(cookieParser());
connectDB();

app.use("/booking", bookingsRoutes);
app.use("/movie", moviesRoutes);
app.use("/user", usersRoutes);
app.post("/insert-movies", feedMovies);
app.get("/health", (_, res) => res.send("ok"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server live on http://localhost:${port}`));
