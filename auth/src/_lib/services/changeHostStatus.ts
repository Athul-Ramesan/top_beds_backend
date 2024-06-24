import { NotFoundError } from "topbeds-package";
import { User } from "../../infrastructure/database/models";


export const changeHostStatus = async (id: string, hostStatus: string) => {
    try {
        let role = 'user'
        if (hostStatus === 'accepted') {
            role = 'host'
        }
        const result = await User.findByIdAndUpdate(
            id,
            {
                $set: { hostStatus, role },
            },
            { new: true }
        )
        
        if (!result) {
            throw new NotFoundError()
        }
        return result
    } catch (error: any) {
        throw new Error(error);

    }
}