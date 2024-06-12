import { UserEntity } from "../entities/UserEntity";

export interface IUpdateUserStatusUseCase {
    execute(userId:string,isBlocked:boolean):Promise<UserEntity | null>
}