import { Facility } from "@/infrastructure/database/Models/Facility"
import { NotFoundError } from "topbeds-package";


 export const  addFacility =async(name:string,icon:string)=>{
    try {
        const result =await Facility.create({name:name , icon:icon})
        if(!result){
          throw new Error("Couldn't save facility");
          
        }
        return result
    } catch (error:any) {
        console.log("🚀 ~ addFacility ~ error:", error)
        
    }
 }