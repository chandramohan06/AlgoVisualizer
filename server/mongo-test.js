require("dotenv").config();

const mongoose = require("mongoose");

console.log("Node:", process.version);
console.log("Mongoose:", mongoose.version);
console.log(
  "URI:",
  process.env.MONGODB_URI.replace(/\/\/(.*?):(.*?)@/, "//$1:********@")
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Error:");
    console.error(err);
    process.exit(1);
  });