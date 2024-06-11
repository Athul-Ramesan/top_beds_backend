import { UserEntity } from "../entities/UserEntity";

export interface IUpdadateProfileImageUseCase {
    execute(id:string,image:string):Promise<UserEntity | null>
}