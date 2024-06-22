import { UserEntity } from "@/domain/entities/UserEntity"
import { User } from "@/infrastructure/dataBase/models/User"
import { FilterQuery } from "mongoose"

export const getAllHosts =async(page:number,limit:number,search:string,status:string)=>{

    try {

        const query:FilterQuery<UserEntity> ={}
        if(status){
            query["hostStatus"]= String(status)
            query["role"] = "host"
        }
        const hosts = await User.find(
              { role: "host" ,isBlocked:false}
          )
        console.log("🚀 ~ getAllHosts ~ hosts:", hosts)
        return hosts
    } catch (error:any) {
        throw new Error(error);
        
    }
}