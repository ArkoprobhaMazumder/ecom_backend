
import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Mongo Database");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}


export default connectDb;
