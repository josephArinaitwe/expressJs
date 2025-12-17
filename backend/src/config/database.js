import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB conected !!!
            ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MongoDB connection Failed")
        process.exit(1);
    }
}

export default connectDB;