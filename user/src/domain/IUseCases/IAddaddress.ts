import { IAddress } from "../entities/AddressEnitity";
import { UserEntity } from "../entities/UserEntity";

export interface IAddAddressUseCase{
    execute(_id: string, data:IAddress):Promise<UserEntity |null>
}