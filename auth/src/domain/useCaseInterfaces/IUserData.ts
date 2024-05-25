import { ObjectId } from "mongoose";
import { UserEntity } from "../entities";

export interface IGetUserDataUseCase {
    execute(data:string):Promise <UserEntity | null>
}