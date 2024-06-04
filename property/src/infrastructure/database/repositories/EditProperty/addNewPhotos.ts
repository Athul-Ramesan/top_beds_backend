import { Property } from "../../Models/property"

export const addNewPhotosRepository= async(proertyId:string, images:string[]) => {
    console.log("🚀 ~ addNewPhotos ~ proertyId:", proertyId)
    console.log("🚀 ~ addNewPhotos ~ images:", images)
    try {
        const result = await Property.findByIdAndUpdate(
            proertyId,
            {
                $push: {
                    images : {
                        $each: images
                    }
                }
            },
            {new:true}
        )
        if(!result){
            throw new Error("Property not found");
        }
        return result
    } catch (error:any) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}   