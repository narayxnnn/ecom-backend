import User from "../models/usersModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Success",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
