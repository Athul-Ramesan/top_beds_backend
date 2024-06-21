import { IAddress } from "@/domain/entities/IAddress";
import { User } from "@/infrastructure/database/Models";

export const becomeHostConsumer= async( _id: string,
    data:IAddress
)=>{
    try {
        console.log('inside become host address adding before', data);
        
        const user = await User.findOneAndUpdate(
            { _id: _id },
            { $set: {address: data }, },
            { new: true }
        )
        console.log("🚀 ~ user inside consumer of becomehost:", user)
        
    } catch (error: any) {
        throw new Error(error.message);
    }

}
