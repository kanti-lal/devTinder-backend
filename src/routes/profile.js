const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  validationEditProfile,
  validationForgotPasswordProfile,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validationEditProfile(req)) {
      throw new Error("invalid edit request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({
      message: "profile updated successfully",
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/forgot-password", userAuth, async (req, res) => {
  try {
    validationForgotPasswordProfile(req);

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const loggedInUser = req.user;
    loggedInUser.password = passwordHash;

    await loggedInUser.save();

    res.json({
      message: "password updated successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
