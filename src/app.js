"use strict";
const express = require("express");
const cors = require("cors");
const dotevn = require("dotenv");
const multer = require("multer");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotevn.config();
mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
const port = 3001;
const Product = require("./routes/ProductRoutes");
const User = require("./routes/UserRoutes");
const Cart = require("./routes/CartRoutes");
app.use("/api/v1/product", Product);
app.use("/api/v1/user", User);
app.use("/api/v1/cart", Cart);

app.listen(port, () => console.log(`Running on port: ${port}`));
