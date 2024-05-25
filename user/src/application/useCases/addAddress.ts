import { IAddress } from "@/domain/entities/AddressEnitity";
import { IDependencies } from "../interfaces/IDependencies";

export const addAddressUseCase =(dependencies:IDependencies)=>{

    const {repositories:{AddAddressRepository}} = dependencies

    return {
        execute : async (_id:string,data:IAddress)=>{
            return await AddAddressRepository(_id,data)
        }
    }
}