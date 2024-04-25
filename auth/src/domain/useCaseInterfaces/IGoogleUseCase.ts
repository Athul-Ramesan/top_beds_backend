import { UserEntity } from "../entities";

export interface IGoogleSignupOrLoginUseCase {
    
    execute(user: UserEntity): Promise<UserEntity | null>
}