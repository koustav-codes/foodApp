import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getUserController = async (req, res) => {
  try {
    // Debug
    console.log("Decoded User:", req.user);

    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access"
      });
    }

    // ✅ Get user from DB using token _id
    const user = await userModel.findById(req.user._id).select("-password");

    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user API",
      error,
    });
  }
};


//UPDATE PROFILE
// 

export const updateUserController = async (req, res) => {
  try {
    // ✅ Get logged-in user from token (SAFE)
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const { userName, phone, address } = req.body;

    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error,
    });
  }
};


export const updatePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old and new password",
      });
    }

    // ✅ Get user from token
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // ✅ Hash new password
    var salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Password API",
      error,
    });
  }
};

//RESET PASSWORD
export const resetPasswordController = async (req, res) => {
  try{
    const {email, newPassword, answer} = req.body
    if(!email || !newPassword || !answer){
      return res.status(500).send({
        success: false,
        message: 'Please Provide all fields'
      })
    }
    const user = await userModel.findOne({email, answer})
    if(!user){
      return res.status(404).send({
        success: false,
        message: 'No user found'
      })
    }
    // HASHING PASSWORD
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
       await user.save()
       res.status(200).send({
        success: true,
        message: 'Password Reset Successfully',
       })
  }catch(error){
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Password Reset API',
      error
    })
  }
}