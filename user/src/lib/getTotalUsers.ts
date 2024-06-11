import { User } from "@/infrastructure/dataBase/models/User";

export const getTotalUsers=async()=>{
    try {
        
        const totalCount = await User.countDocuments({});
        return totalCount
    } catch (error:any) {
        console.log("🚀 ~ getTotalPage ~ error:", error)
        throw new Error(error.message);
    }
}