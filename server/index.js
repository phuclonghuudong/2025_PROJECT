require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routers/user");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const dbURL = process.env.MONGO_DB_URL_SERVER;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/auth", userRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connect to db successfully!");
  } catch (error) {
    console.log(`Can not connect db ${error}`);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is starting at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Lỗi", error);
  });
