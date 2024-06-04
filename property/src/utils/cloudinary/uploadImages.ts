import { customError } from "topbeds-package"
import cloudinary from "./cloudinary"

export const uploadMultipleImagesToCloudinary = async(images:string[]):Promise<string[]>=>{

    try {
        const cloudinaryUrls:string[] = await Promise.all(
            images.map(async (image:string) => {
                
                const cloudinary_res = await cloudinary.uploader.upload(image,{
                    folder: '/TopBeds/properties'
                })
                return cloudinary_res.secure_url
            })
        )
       
        return cloudinaryUrls
    } catch (error:any) {
        throw new Error(`Error uploading images to Cloudinary: ${error.message}`);
        
    }
}   