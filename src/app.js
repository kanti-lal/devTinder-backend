const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Namaste kanti!");
});

app.use("/hello", (req, res) => {
  res.send("Hello hellow he");
});

app.use("/test", (req, res) => {
  console.log("🚀 ~ app.use ~ res:", res);
  res.send("Hello hellow heeeeee");
});

app.listen("7777", () => {
  console.log("Server is successfully listerning on port 7777");
});
