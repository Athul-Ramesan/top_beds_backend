import { UserEntity, UserLoginEntity } from "../entities";

export interface ILoginUseCase{
    execute(data:UserLoginEntity):Promise<UserEntity|null>
}