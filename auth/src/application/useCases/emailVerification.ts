import { IDependencies } from "../interfaces/IDependencies";

export const emailVerificationUseCase = (dependencies: IDependencies) => {
    const { repositories: { emailVerification } } = dependencies

    return {
        execute: async(email: string) => {
            return await emailVerification(email)
        }
    }
}