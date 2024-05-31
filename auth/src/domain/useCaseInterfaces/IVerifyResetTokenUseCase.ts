import { UserEntity, UserLoginEntity } from "../entities";

export interface IVerifyResetTokenUseCase{
    execute(token:string,password:string):Promise<Boolean|null>
}