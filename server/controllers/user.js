const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const jwtData = { userId: user._id, admin: user.admin };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res
      .cookie("token", token, {
        sameSite: "None",
        secure: true,
        path: "/",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .send({
        message: "Login successful",
        data: { ...user._doc, password: undefined },
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  console.log(req.decoded);
  console.log(req.cookies.token);
  res.clearCookie("token").json({ message: "Logout successful" });
};

module.exports = { signup, login, logout };
