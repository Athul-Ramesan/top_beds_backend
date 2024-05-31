import { Property } from "@/infrastructure/database/Models/property";

export const getTotalPage = async()=>{
    try {
        
        const totalItems = await Property.countDocuments({});
        return totalItems
    } catch (error:any) {
        console.log("🚀 ~ getTotalPage ~ error:", error)
        throw new Error(error.message);
        
    }
}