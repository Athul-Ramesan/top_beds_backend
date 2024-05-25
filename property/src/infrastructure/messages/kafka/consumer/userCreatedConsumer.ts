import { UserEntity } from "@/domain/entities";
import { createUser } from "@/infrastructure/database/repositories";


export default async (
    data:UserEntity
)=>{
    try {
        console.log('🤭🤭🤭created user in property-consumer');
        
        await createUser(data)
    } catch (error:any) {
        console.log("user-created-consumed error: ",error?.message);
    }
}