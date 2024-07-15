import { IUpdateUserData } from "@/domain/entities/IUpdateUserData"
import { User } from "../../Models"

export const updateUserDataRepository = async(data:IUpdateUserData)=>{

    const {_id, ...updatePayload} = data
    const resultUser = await User.findByIdAndUpdate(
        _id,
        {$set : updatePayload},
        {new:true}
    )
    return resultUser
}