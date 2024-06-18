import { IUpdateUserData } from "../../../../domain/entities/IUpdateUserEntity";
import { User } from "../../models";

export const updateUserDataRepository = async(data:IUpdateUserData)=>{

    const {_id, ...updatePayload} = data
    const resultUser = await User.findByIdAndUpdate(
        _id,
        {$set : updatePayload},
        {new:true}
    )
    return resultUser
}