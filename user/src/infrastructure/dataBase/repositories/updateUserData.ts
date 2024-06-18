import { IUserUpdateEntity } from "@/domain/entities/IUserUpdateEntity";
import { User } from "../models/User";

export const updateUserDataRepository =async(payload:IUserUpdateEntity)=>{
  
    const {_id, ...updatePayload} = payload
    const resultUser = await User.findByIdAndUpdate(
        _id,
        {$set : updatePayload},
        {new:true}
    )
    return resultUser
}