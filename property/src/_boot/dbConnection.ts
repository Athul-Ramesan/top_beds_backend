import { config } from "dotenv";
import { connect } from "mongoose";
export default async () => {
    config()
    try {
        console.log('inside mongoose connect')
        await connect(String(process.env.MONGO_URI).trim(), 
        { 
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
        })
        console.log("📚 mongodb connected 📚")
    } catch (error: any) {
        console.log("!!!! db connection lost !!!!")
        console.log(error.message);
        process.exit(1)
    }
}


