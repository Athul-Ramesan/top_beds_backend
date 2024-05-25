import mongoose from "mongoose"
import { Property } from "../Models/property"

export const getHostPropertiesRepository = async(hostId:string) => {
    console.log("🚀 ~ getHostPropertiesRepository ~ hostId:", hostId)
    
    try {
        
        const properties = await Property.find({hostId}).exec()

        console.log("🚀 ~ getHostPropertiesRepository ~ properties:", properties)
        
        if(!properties){
            throw new Error("No properties found")
        }
        return properties
    } catch (error:any) {
        console.log("🚀 ~ getHostPropertiesRepository ~ error:", error)
        throw error
    }
    
}