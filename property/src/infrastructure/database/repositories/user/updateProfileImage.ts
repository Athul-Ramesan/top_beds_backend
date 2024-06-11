import { customError } from "topbeds-package";
import { User } from "../../Models";
import { UserEntity } from "@/domain/entities";



export const updateProfileImage = async (_id: string, profileImage: string):
    Promise<UserEntity | null> => {

    try {
        console.log('inside profile image update repository of property service',profileImage)
    const result = await User.findByIdAndUpdate(
        _id,
        { profileImage }
        , { new: true })

        console.log("🚀 ~ result:", result)
        
    if (!result) {
        throw new customError("User Not found ", 404);
    }
    return result
    } catch (error:any) {
        throw new Error(error.message);
    }
}