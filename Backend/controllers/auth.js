require("dotenv").config();
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters";
const lengthErr = "must be between 8 and 24 characters";

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 2, max: 24 })
    .withMessage(`First name ${lengthErr}`),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 2, max: 24 })
    .withMessage(`Last name ${lengthErr}`),
  body("phonenumber")
    .exists({ checkFalsy: true })
    .withMessage("Phone number is required.")
    .customSanitizer((value) => value.replace(/[\s\-\(\)]/g, ""))
    .matches(/^\+?[0-9]{7,15}$/)
    .withMessage("Invalid phone number format."),
  //correct version but gets auto changed to the one below
  //  "^\+?[0-9]{7,15}$"
  // .matches("^+?[0-9]{7,15}$"),
  body("address")
    .trim()
    .matches(/^[a-zA-Z0-9\s,.'-]+$/)
    .withMessage(
      "Address can only contain letters, numbers, spaces, commas, periods, and hyphens."
    )
    .isLength({ min: 5, max: 100 })
    .withMessage("Address must be between 5 and 100 characters."),

  body("city")
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("City must only contain letters and spaces.")
    .isLength({ min: 2, max: 50 })
    .withMessage("City must be between 2 and 50 characters."),

  body("state")
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("State must only contain letters and spaces.")
    .isLength({ min: 2, max: 50 })
    .withMessage("State must be between 2 and 50 characters."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

exports.createUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc, err) => {
        acc[err.path] = err.msg;
        return acc;
      }, {});
      return res.status(400).json({ errors: formattedErrors });
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password" });
      }

      try {
        //db function to insert NEW USER WITH hashed password in database
        await db.createUser(
          req.body.email,
          hashedPassword,
          req.body.firstname,
          req.body.lastname,
          req.body.phonenumber,
          req.body.address,
          req.body.city,
          req.body.state
        );

        res.status(201).send("User created successfully");
      } catch (error) {
        if (error.code === "P2002") {
          // Prisma's unique constraint violation (for email or phone)
          const field = error.meta?.target?.includes("email")
            ? "email"
            : "phone number";
          return res.status(400).json({ error: `${field} is already in use` });
        }

        return res.status(500).json({ error: "Something went wrong" });
      }
    });
  },
];

exports.loginUser = async (req, res) => {
  // console.log("req.body ", req.body.email);
  //db function to find user
  const user = await db.findUser(req.body.email);

  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const payload = {
        id: user.id,
        firstname: user.firstname,
        email: user.email,
        phonenumber: user.phone,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.json({ user: payload });
    } else {
      res.status(400).json({ error: "INCORRECT USERNAME OR PASSWORD" });
    }
  } catch (error) {
    return res.status(500).json({ error: "UNKNOWN ERROR" });
  }
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "None",
  });

  res.json({ message: "logged out successfully" });
};

exports.accessToken = async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(200).json({ user: null });
  }
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.json({ user: payload });
  } catch (error) {
    res.status(500).send("INVALID OR EXPIRED TOKEN");
  }
};

function isValidPhoneNumber(phoneNumber) {
  // Regex to check valid phone number.
  // const pattern = ;

  // If the phone number is empty return false
  if (!phoneNumber) {
    return "false";
  }

  // Return true if the phone number
  // matched the Regex
  if (pattern.test(phoneNumber)) {
    return "true";
  } else {
    return "false";
  }
}

// body("username")
//   .trim()
//   .matches(/^[a-zA-Z0-9_]+$/) // Allow only letters, numbers, and underscores
//   .withMessage("Username must contain only letters, numbers, and underscores")
//   .isLength({ min: 3, max: 20 })
//   .withMessage("Username must be between 3 and 20 characters");
