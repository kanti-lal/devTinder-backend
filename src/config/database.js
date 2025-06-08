const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:C0kRd4BfA6guoFZR@namastenode.e1smuki.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
