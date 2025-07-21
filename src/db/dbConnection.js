import mongoose from "mongoose";

export const connectDb=async()=>{
    try {
        const connectData=await mongoose.connect(`${process.env.CONNECTION_STRING}`);
        console.log("The host is :",connectData.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}