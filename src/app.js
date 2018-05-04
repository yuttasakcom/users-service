const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/users-service")
  .then(() => console.log("Mongo Connected"))
  .catch(err => {
    console.log("Mongo Error: ", err);
    process.exit(1);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("port", process.env.PORT || "3000");

const routes = require("./routes");
app.use(routes);

module.exports = app;
