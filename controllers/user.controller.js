const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

//@route POST api/users/register
//@desc Register a user
//@access Public
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Create a new user
  const newUser = new User({
    name,
    email,
    password,
    role,
  });

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  // Save user to database
  await newUser.save();

  return res.status(200).json({ msg: "User registered", user: newUser });
};

//@route POST api/users/login
//@desc Login a user
//@access Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  return res.status(200).json({ msg: "User logged in", user });
};
