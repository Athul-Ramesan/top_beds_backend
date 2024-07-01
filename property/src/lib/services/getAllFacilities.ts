import { Facility } from "@/infrastructure/database/Models/Facility"


 export const  getAllFacilities =async()=>{
    try {
        const result = await Facility.find()
        if(!result){
          throw new Error("Couldn't get facility");
        }
        return result
    } catch (error:any) {
        console.log("🚀 ~ addFacility ~ error:", error)
    }
 }