const validator = require("validator");

const validationSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validationEditProfile = (req) => {
  console.log("🚀 ~ validationEditProfile ~ req:", req.body);
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "skills",
    "about",
    "age",
    "photoUrl",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  if (!isEditAllowed) {
    throw new Error("Invalid edit request");
  }

  return isEditAllowed;
};

const validationForgotPasswordProfile = (req) => {
  console.log("🚀 ~ validationForgotPasswordProfile ~ req.body:", req.body);

  const allowedEditFields = ["password"];
  const requestFields = Object.keys(req.body);

  if (requestFields.length === 0) {
    throw new Error("No data provided in request body");
  }

  const isEditAllowed = requestFields.every((field) =>
    allowedEditFields.includes(field)
  );

  if (!isEditAllowed) {
    throw new Error("Only password field is allowed to be update");
  }

  const password = req.body.password;

  // ✅ Strong password check
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be strong (min 8 characters, include uppercase, lowercase, number, and symbol)"
    );
  }

  return true;
};

module.exports = {
  validationSignupData,
  validationEditProfile,
  validationForgotPasswordProfile,
};
