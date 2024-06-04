import { customError } from "topbeds-package"
import { Property } from "../Models/property"

export const deletePropertyPhotoRepository = async(propertyId:string,image:string) => {
    console.log("🚀 ~ deletePropertyPhoto ~ image:", image)
    console.log("🚀 ~ deletePropertyPhoto ~ propertyId:", propertyId)
        
        try {
            const updatedProperty = await Property.findByIdAndUpdate(
                propertyId,
                {
                    $pull: {
                        images: image
                    }
                },
                {new:true}
            )
            if(!updatedProperty){
                throw new customError("Property not found",404)
            }
            return updatedProperty
        } catch (error:any) {
            throw new Error(`Error in deleting image: ${error.message}`);
            
        }
}