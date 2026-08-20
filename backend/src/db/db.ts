import mongoose from "mongoose";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function connectDB(){
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined");

    try{
        await mongoose.connect(uri);
        console.log("MongoDB connected")
    }
    catch(err){
        console.log("MongoDB connection error: ", err)
    }
}