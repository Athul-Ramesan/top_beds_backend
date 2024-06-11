import { updateProfileImage } from "@/infrastructure/database/repositories";

interface profileImageUpdatedConsumerProps{
    _id:string
    image: string;
    
}

export const profileImageUpdatedConsumer =async (data:profileImageUpdatedConsumerProps) => {
    console.log("🚀 ~ profileImageUpdatedConsumer ~ data:", data)
    try {
        const { _id, image } = data;
        await updateProfileImage(_id,image)
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}