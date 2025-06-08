const express = require("express");

const app = express();

// app.get("/user/:userId/:name", (req, res) => {
//   console.log(req.params);
//   res.send({ firstName: "Kantilal", lastName: "Suthar" });
// });

app.use("/user", [
  (req, res, next) => {
    console.log("response !!");
    next();
  },
  (req, res, next) => {
    console.log("inside res 2");
    // res.send("user response 2 !!!");
    next();
  },
  (req, res, next) => {
    console.log("inside res 3");
    // res.send("user response 3 !!!");
    next();
  },
  (req, res, next) => {
    console.log("inside res 4");
    res.send("user response 4 !!!");
  },
  (req, res, next) => {
    console.log("inside res 5");
    res.send("user response 5 !!!");
  },
]);

app.listen("7777", () => {
  console.log("Server is successfully listening on port 7777");
});
