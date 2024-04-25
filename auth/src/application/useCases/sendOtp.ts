import { verificationEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const sendOtpUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { sendOtpRepository }
    } = dependencies;

    return {
        execute: async (data: verificationEntity) => {
            console.log(data,"data inside sendotpsusecase");
            
            return sendOtpRepository(data)
        }

    }
}