import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// ================= REGISTER =================
export const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required details",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already registered, please login",
      });
    }
    // HASHING PASSWORD
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "User profile created successfully",
      user,
    });

  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// ================= LOGIN =================
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide Email and Password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // CHECK USER PASSWORD || COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // ✅ FIXED TOKEN PAYLOAD
    const token = JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Logged In Successfully",
      token,
      user,
    });

  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};