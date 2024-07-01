import { Facility } from "@/infrastructure/database/Models/Facility"
import { NotFoundError } from "topbeds-package";


 export const  deleteFacility =async(_id:string)=>{
    try {
        const result = await Facility.deleteOne({_id:_id})
        if(!result){
          throw new Error("Couldn't delete facility");
        }
        return result
    } catch (error:any) {
        console.log("🚀 ~ addFacility ~ error:", error)
    }
 }