import mongoose from "mongoose";
import colors from 'colors';

//mongoDB database connection function

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${mongoose.connection.host}` .bgWhite)
    }catch(error){
        console.log('DB Error', error);
    }
}

export default connectDb;