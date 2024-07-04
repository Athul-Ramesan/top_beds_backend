
import { register } from "tsconfig-paths"
register({
    baseUrl: __dirname,
    paths: { '@/*': ['*'] },
    addMatchAll: false,
})


import app from "@/presentation"
import dbConnection from "@/_boot/dbConnection"
import { runConsumer } from "./infrastructure/messages/kafka/consumer"
(async()=>{
    try {
        console.log('its here server');
        app
        await dbConnection()
        await runConsumer()
    }catch(error:any){
        console.error(error,"_____failed to config property service ");
        
    }finally{
        process.on("SIGINT", () => { 
            console.log("\n\n server is shutting down")
            process.exit();  
          });
    }
})()


