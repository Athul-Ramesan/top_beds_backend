import { NotFoundError } from "topbeds-package";
import { User } from "../../infrastructure/database/models";

export const updateUserData = async (_id: string, payload: any) => {
    console.log("🚀 ~ updateUserData ~ payload:", payload);
    console.log("🚀 ~ updateUserData ~ _id:", _id);
  
    const result = await User.findByIdAndUpdate(_id, payload, { new: true });
    console.log("🚀 ~ updateUserData ~ result:", result);
        
        if (!result) {
            throw new NotFoundError()
        }
        return result
    } 
