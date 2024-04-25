import { UserEntity } from "../entities";

export interface ISignupUseCase {
    
    execute(user: UserEntity): Promise<UserEntity | null>
}