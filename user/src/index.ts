
import { register } from "tsconfig-paths"
register({
    baseUrl: __dirname,
    paths: { '@/*': ['*'] },
    addMatchAll: false,
})

import { runConsumer } from "@/infrastructure/messages/kafka/consumer"
import dbConnection from "@/_boot/dbConnection"
import app from "@/presentation"
// import('tsconfig-paths').then(({register})=>{
    //     register({
        //         baseUrl: __dirname,
        //         paths: { '@/*': ['*'] },
        //         addMatchAll: false,
        //       })
        
        // })

        
        (async()=>{
            try {
                
        app
        await dbConnection()
        await runConsumer().then((result)=>{
            console.log(result);
            console.log('kafka is running');
        }).catch(err=>{
            console.log(err);
            console.log('errror in kafka consumer');
        })
        
    } catch (error:any) {
        console.log(error,"____failed to config user service")
    }finally{
        process.on("SIGINT",()=>{
            console.log("\n\n server is shutting down");
            process.exit();
        })
    }
})()



