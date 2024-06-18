import { producer } from "..";
import { UserEntity } from "../../../../../domain/entities";

export default async (
    _id:string,
    password:string | null
)=>{
    try {
        console.log('before sending producer reset password');
        await producer.connect();
        const messages =[
            {
                topic: 'to-user-service',
                messages:[
                    {
                        key: 'resetPassword',
                        value: JSON.stringify({_id,password})
                    }
                ]
            },
            {
                topic: 'to-property-service',
                messages:[
                    {
                        key:'resetPassword',
                        value:JSON.stringify({_id,password})
                    }
                ]
            }
        ]

        await producer.sendBatch({
            topicMessages: messages
        })
        console.log('after sending producer reset password');
        
        await producer.disconnect();
    } catch (error:any) {
        console.log("kafka producer error", error?.message);
        
    }finally{
        await producer.disconnect()
    }
}