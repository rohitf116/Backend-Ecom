"use strict";
const express = require("express");
const cors = require("cors");
const dotevn = require("dotenv");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
dotevn.config();
mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
const port = 3001;
const Product = require("./routes/ProductRoutes");
app.use("/product", Product);

app.listen(port, () => console.log(`Running on port: ${port}`));
