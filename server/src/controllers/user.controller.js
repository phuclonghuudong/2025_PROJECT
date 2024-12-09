const UserModel = require("../models/UserModel");
const { getAccessToken } = require("./../utils/getAccessToken");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const body = req.body;
  const { email, name, password } = body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error("Tài khoản Email đã tồn tại!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    body.password = hashpassword;

    const newUser = new UserModel(body);
    await newUser.save();

    delete newUser.password;

    newUser.token = await getAccessToken({
      _id: newUser._id,
      email: newUser.email,
      rule: newUser.rule,
    });

    res.status(200).json({
      message: "Register Success!!",
      data: newUser,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const body = req.body;
  try {
    console.log(body);

    res.status(200).json({
      message: "Login Success!",
      data: body,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { register, login };
