import { UserEntity } from "@/domain/entities/UserEntity";
import { FilterQuery } from "mongoose";
import { User } from "../../models/User";
import { customError } from "topbeds-package";

export const getAllUsersRepository = async(
    data: {
        page?:  number;
        limit?: number;
        isBlocked?: boolean;
        search?: string
    }
):Promise<UserEntity[] | null>=>{
    console.log("🚀 ~ data:", data)

    const page = data.page || 1
    const limit = data.limit || 10
    const skip = (page-1)*limit
    const query :FilterQuery <UserEntity> ={}
    
    if(data.isBlocked){
        query['isBlocked'] = data.isBlocked
    }
    if(data.search){
        const regex = data.search.split(/\s+/).map(splitedPart =>`.*${splitedPart}.*`);
        const searchRegex = new RegExp(regex.join('|'),'i')
        query['$or'] = [
            { 'title': { $regex: searchRegex } },
            { 'email': { $regex: searchRegex } }
        ];
    }
    const users = await User.find(query).skip(skip).limit(limit)
    
    console.log("🚀 ~ users:", users)
    if(!users){
        throw new customError("No users found",404);
    }
    return users
}