const express = require("express");
const auth = require("../middleware/auth");
const userSchema = require("../models/userSchema");
const { login, logout, signup } = require("../controllers/user");

const router = express.Router();

router.get("/auth", auth, async (req, res, next) => {
  try {
    const { userId } = req.decoded;
    const user = await userSchema.findById(userId);
    res.send({
      message: "Success",
      data: { ...user?._doc, password: undefined },
    });
  } catch (error) {
    next(error);
  }
});
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
