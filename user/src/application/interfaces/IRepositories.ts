import { IAddress } from "@/domain/entities/AddressEnitity"
import { UserEntity } from "@/domain/entities/UserEntity"

export interface IRepositories{
    changeRoleRepository : (_id:string) =>Promise<UserEntity | null>;
    AddAddressRepository: (_id:string, data:IAddress)=>Promise<UserEntity | null>;
    updateProfileImage : (_id:string,image:string)=> Promise<UserEntity |null> ;
    getAllUsersRepository: (data:
        {
            page?:  number;
            limit?: number;
            isBlocked?: boolean;
            search?: string
        }
    ) =>Promise<UserEntity[] | null>;
    updateUserStatusRepository: (userId:string,isBlocked:boolean)=> Promise<UserEntity |null>;
    
}