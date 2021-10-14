const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const infoRouter = require("./routes/info");
dotenv.config();

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
// Route
app.use(infoRouter);

const PORT = process.env.PORT || 500;
app.listen(PORT, () => console.log("Server is running"));
