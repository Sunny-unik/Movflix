const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(bodyParser());
app.use(cors());

app.get("/health", (_, res) => res.send("ok"));

app.listen(port, () => console.log(`Server live on http://localhost:${port}`));
