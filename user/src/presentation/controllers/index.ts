import { IDependencies } from "@/application/interfaces/IDependencies";
import { becomeHostController } from "./becomeHost";
import { updateProfileImageController } from "./updateProfileImage";
import { getAllUsersController } from "./getAllUsers";


export const controllers = (dependencies:IDependencies)=>{

    return {
        becomeHost:becomeHostController(dependencies),
        updateProfileImage: updateProfileImageController(dependencies),
        getAllUsers: getAllUsersController(dependencies)
    }
}