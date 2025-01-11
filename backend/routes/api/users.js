const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your first name."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your first name."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    firstName,
    lastName,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

router.get("/", async (req, res) => {
  const Users = []
  let users = await User.findAll()

  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let usersRes = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    Users.push(usersRes);
  }
  return res.status(200).json({ Users });
})

module.exports = router;
