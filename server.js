const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URI);
const noteRouter = require("./routes/noteRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const app = express();
const PORT = process.env.PORT || 3000;

//Mongoose connection
const mongooseConnection = mongoose.connection;

mongooseConnection.on("connecting", () => {
  console.log("Connecting to MongoDb");
});

mongooseConnection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongooseConnection.on("error", () => {
  console.log(`MongoDB connection failed`);
});

mongooseConnection.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
