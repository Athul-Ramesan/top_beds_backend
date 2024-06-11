import { UserEntity } from "../entities/UserEntity";

export interface IGetAllUsersUseCase {
    execute(data:{
        page?:  number;
        limit?: number;
        isBlocked?: boolean;
        search?: string
    }):Promise<UserEntity[] | null>
}