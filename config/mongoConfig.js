
import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(`mongodb://localhost:27017/forever_ecom`);
        console.log("Connected to Mongo Database");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}


export default connectDb;
