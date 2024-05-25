import { IDependencies } from "@/application/interfaces/IDependencies";
import { becomeHostController } from "./becomeHost";


export const controllers = (dependencies:IDependencies)=>{

    return {
        becomeHost:becomeHostController(dependencies)
    }
}