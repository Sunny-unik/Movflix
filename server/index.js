const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDB = require("./db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(bodyParser());
app.use(cors());
connectDB();

app.get("/health", (_, res) => res.send("ok"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server live on http://localhost:${port}`));
