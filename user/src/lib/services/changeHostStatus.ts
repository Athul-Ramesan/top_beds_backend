import { User } from "@/infrastructure/dataBase/models/User"
import { NotFoundError } from "topbeds-package";


export const changeHostStatus =async(id:string)=>{
    try {
        const result = await User.findByIdAndUpdate(
            id,
            {$set : {
                hostStatus: 'requested'
            }}
        )
        if(!result){
            throw new NotFoundError()
        }
    } catch (error:any) {
        throw new Error(error);
        
    }
}