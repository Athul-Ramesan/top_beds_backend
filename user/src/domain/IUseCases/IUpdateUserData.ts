import { IUserUpdateEntity } from "../entities/IUserUpdateEntity";
import { UserEntity } from "../entities/UserEntity";

export interface IUpdateUserDataUseCase{
    execute(payload:IUserUpdateEntity):Promise<UserEntity |null>
}