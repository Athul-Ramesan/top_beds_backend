import { ObjectId } from "mongoose";
import { IDependencies } from "../interfaces/IDependencies";

export const getUserDataUseCase = (dependencies: IDependencies) => {
    const { repositories: { getUserDataRepository } } = dependencies

    return {
        execute: (data: ObjectId) => {
            return getUserDataRepository(data)
        }
    }
}