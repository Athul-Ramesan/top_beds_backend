import { IAddress } from "@/domain/entities/AddressEnitity"
import { User } from "../models/User"
import { UserEntity } from "@/domain/entities/UserEntity";


export const AddAddressRepository = async(
    _id:string,address:IAddress
):Promise<UserEntity |null>=>{
    try {

        const user = await User.findOne({_id})
        console.log("🚀 ~ user:", user)
        
        const result = await User.findByIdAndUpdate(
            _id,
            { $set:{address:address}},
            {new:true}
        )
        console.log("🚀 ~ result:", result)
        
        if(!result){
            throw new Error("Sorry cannot save the address now");
        }
        return result
    } catch (error:any) {
        console.log("🚀 ~ error:", error)
        
        throw new Error(error?.message);
    }
}
