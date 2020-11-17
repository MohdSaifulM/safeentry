const router = require("express").Router();
require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//students should validate input from form
router.post("/register", async (req, res) => {
  try {
    let { firstname, lastname, username, email, password } = req.body;

    // let u = User.exists({ emails})

    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    let savedUser = await user.save();

    let payload = {
      user: {
        id: savedUser._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 100000000000000000000 },
      (err, token) => {
        if (err) throw err;

        // res.status(200).json({ token });
        res.status(201).json({ message: "successfully registered!", token });
      }
    );
  } catch (error) {
    console.log(error); //must remove before deploying for production
    res.status(400).json({ message: "something went wrong!" });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    //check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user with email not found!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "user information not a match" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 100000000000000000000 },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({ token });
      }
    );
  } catch (error) {}
});
module.exports = router;
