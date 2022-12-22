import express from "express";
import Users from "../models/user.js";
import bcrypt from "bcrypt";
import validation from "../middleware/validation.js";
import userSchemaVal from "../validations/userValidation.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

let refreshTokens = [];

router.post("/register", validation(userSchemaVal), async (req, res) => {
  const { lastName, firstName, email, password } = req.body;
  if (!lastName || !firstName || !email || !password) {
    return res.status(400).json({ msg: "Information incorrect" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password should be at least 6 characters long" });
  }
  const user = await Users.findOne({ email }); // Finding user in DB by email
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const newUser = new Users({
    firstName,
    lastName,
    email,
    password,
  });
  bcrypt.hash(password, 7, async (err, hash) => {
    if (err) {
      return res.status(400).json({ msg: "error while saving the password" });
    }
    newUser.password = hash;
    const savedUserRes = await newUser.save();
    delete savedUserRes.password;
    if (savedUserRes) {
      return res.status(200).json({ msg: " User successfully saved" });
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Something is missing" });
    return;
  }

  const user = await Users.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  //Comparing password with saved hashed password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(400).json({ msg: "Invalid credentials" });
  } else {
    const payload = JSON.stringify(user);
    const token = jwt.sign({ payload: payload }, process.env.TOKEN, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(
      { payload: payload },
      process.env.REFRESH_TOKEN
    );
    refreshTokens.push(refreshToken);

    return res
      .status(200)
      .json({ msg: "You have logged in", token, refreshToken, user });
  }
});

router.get("/admin", authMiddleware, async (req, res) => {
  return res.json({ msg: "Admin accesed" });
});

router.post("/refresh-token", (req, res) => {
  const { token } = req.body;
  if (!refreshTokens.includes(token)) {
    console.table(token);
    return res.status(403).send({ msg: "No refresh-token" });
  }
  jwt.verify(token, process.env.REFRESH_TOKEN, (err, data) => {
    if (err) {
      res.sendStatus(403);
    }
    const payload = JSON.stringify(data);
    const newAccessToken = jwt.sign({ payload: payload }, process.env.TOKEN);
    res.json({ token: newAccessToken });
  });
});

router.get("/users", async (req, res) => {
  const users = await Users.find();
  if (!users) {
    return res.status(401).json({ msg: "No users found" });
  }
  res.status(200).json(users);
});

router.get("/users/:user", async (req, res) => {
  const id = req.params.user;
  console.log(id);
  const user = await Users.findById(id);

  if (!user) {
    return res.status(400).json({ msg: "user not found" });
  }
  res.status(200).json(user);
});

router.delete("/logout", (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
  res.status(204).send({ msg: "Logout successful" });
});

export default router;
