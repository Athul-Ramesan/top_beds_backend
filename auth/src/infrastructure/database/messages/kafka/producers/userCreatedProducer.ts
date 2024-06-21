import { producer } from "..";
import { UserEntity } from "../../../../../domain/entities";

export default async (
    data:UserEntity | null
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
            },
            {
                topic: 'to-property-service',
                messages:[
                    {
                        key:'userCreated',
                        value:JSON.stringify(data)
                    }
                ]
            },
            {
                topic: 'to-booking-service',
                messages:[
                    {
                        key:'userCreated',
                        value:JSON.stringify(data)
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