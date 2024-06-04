import { customError } from "topbeds-package"
import { Property } from "../../Models/property"
import { IUpdatePropertyEntity } from "@/domain/entities"



export const updatePropertyRepository = async(propertyId:string,data:IUpdatePropertyEntity) => {
    console.log("🚀 ~ editTitleRepository ~ data:", data)

    try {
        const result = await Property.findByIdAndUpdate(
            propertyId,
            { $set: data },
            {new:true}
        )
        if(!result){
            throw new customError('Property not found',404)
        }
        return result
    } catch (error:any) {
        throw new Error(error.message)
    }
}