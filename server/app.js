const express = require("express");
const cors = require("cors");
const api = require("./serverMain/api");
const bodyparser = require("body-parser");
const errorHandler = require("./middleware/errorMiddleware");
const cookieparser = require("cookie-parser");
const path = require("path");
const app = express();
const Url = process.env.FRONT_URL;
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: [`${Url}`],
    credentials: true,
  })
);

app.use("/v1", api); // define routes for the api middleware before the errorHandler middleware

app.use(errorHandler);
module.exports = app;
