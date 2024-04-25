import { producer } from "..";
import { UserEntity } from "../../../../../domain/entities";

export default async (
    data:UserEntity
)=>{
    try {
        console.log('before sending producer');
        await producer.connect();
        const messages =[
            {
                topic: 'to-user-service',
                messages:[
                    {
                        key: 'userCreated',
                        value: JSON.stringify(data)
                    }
                ]
            }
        ]

        await producer.sendBatch({
            topicMessages: messages
        })
        console.log('after sending producer');
        
        await producer.disconnect();
    } catch (error:any) {
        console.log("kafka producer error", error?.message);
        
    }finally{
        await producer.disconnect()
    }
}