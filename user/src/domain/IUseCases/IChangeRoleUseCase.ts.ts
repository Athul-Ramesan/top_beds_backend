import { UserEntity } from "../entities/UserEntity";

export interface IChangeRoleUseCase {
    execute(id:string):Promise<UserEntity | null>
}