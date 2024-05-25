import { IAddress } from "@/domain/entities/AddressEnitity"
import { UserEntity } from "@/domain/entities/UserEntity"

export interface IRepositories{
    changeRoleRepository : (_id:string) =>Promise<UserEntity | null>
    AddAddressRepository: (_id:string, data:IAddress)=>Promise<UserEntity | null>
}