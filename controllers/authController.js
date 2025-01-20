import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import User from "../models/usersModel.js";
import { promisify } from "util";

const signToken = (id) => jwt.sign({ id }, "jwt_secret", { expiresIn: "24h" });

export const signup = async (req, res) => {
  try {
    // steps involved
    // 1. take data from the user
    // 2. encrypt the password
    // 3. remove the confirm password
    // 4. save in database

    const { name, password, email, passwordConfirm } = req.body;

    console.log(req.body);

    const user = await User.create({ name, password, passwordConfirm, email });

    const token = signToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    // check for eamil and password

    const { name, password, email, passwordConfirm } = req.body;
    if (!email || !password) {
      res.status(500).json({ message: "user not valid" });
    }
    // check that user of that eamil exist or not
    const user = await User.findOne({
      email,
    });
    if (!user) {
      res.status(500).json({ message: "user not exist" });
    }

    //if yes then create token and send it to user
    const token = signToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const protect = async (req, res, next) => {
  try {
    // get token from the headers

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(403).json({ message: "You are not logged in" });
      return;
    }

    // verify the tokenn

    const decoded = await promisify(jwt.verify)(token, "jwt_secret");

    // find the user

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      res
        .status(404)
        .json({ message: "The user beloging to this token does not exist" });

      return;
    }

    req.user = currentUser;

    console.log(decoded);

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
