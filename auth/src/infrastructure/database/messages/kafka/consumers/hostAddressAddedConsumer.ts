import { IAddress } from "../../../../../domain/entities/IAddress";
import { User } from "../../../models";

export const hostAddressAddedConsumer =async (_id: string, data: IAddress) => {
    try {

        console.log("auth becomehost consumer",data)
        const user = await User.findOneAndUpdate(
            { _id: _id },
            { $set: { address:data,role:"host" } },
            { new: true }
        )
        console.log("🚀 ~ hostAddressAddedConsumer ~ user:", user)
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}