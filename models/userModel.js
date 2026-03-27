import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    userName:{
        type: String,
        required: [true, 'USER Name is Required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    usertype: {
        type: String,
        required: [true, 'user type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'chef']
    },
    profile: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
    },
    answer: {
        type: String,
        required:[true,'Answer is Required, or else not work']
    }
},
{ timestamps: true }
);

// create model
const userModel = mongoose.model("users", userSchema);

// export model
export default userModel;