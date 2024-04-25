import { verificationEntity } from "../entities";

export interface IVerifyAccountUseCase{
    execute(data:verificationEntity): Promise<verificationEntity |null>
} 