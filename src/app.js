const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("ssds error");
    res.send("User data sent");
  } catch (err) {
    res.status(500).send("something went wrong in userdata");
  }
});

// app.get("/user", userAuth, (req, res) => {
//   res.send("user data sent ");
// });

// app.post("/user/login", (req, res) => {
//   res.send("user created successfully !!! ");
// });

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All data fetched ");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("Deleted a user");
// });

// app.get("/user", userAuth, (req, res) => {
//   res.send("fetched all user");
// });

// app.use("/user", userAuth, (req, res) => {
//   res.send("user data received");
// });

app.use(
  "/user",
  (req, res, next) => {
    console.log("first");
    // res.send("user data received");
    next();
  },
  (req, res, next) => {
    res.send("find");
  }
);

app.use("/my", (req, res) => {
  try {
    throw new Error("not available");
  } catch (error) {}
  res.send("error in catch ");
});

app.listen("7777", () => {
  console.log("Server is successfully listening on port 7777");
});
