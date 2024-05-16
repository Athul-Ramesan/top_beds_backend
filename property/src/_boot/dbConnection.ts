import { config } from "dotenv";
import { connect } from "mongoose";
export default async()=>{
    config()
    try {
        await connect(String(process.env.MONGO_URI).trim())
        console.log("📚 mongodb connected 📚")
    } catch (error:any) {
        console.log("!!!! db connection lost !!!!")
        console.log(error.message);
        process.exit(1)
    }
}