import dbConnection from "./_boot/dbConnection";
import { runConsumer } from "./infrastructure/database/messages/kafka/consumer";
import app from "./presentation";

(async()=>{
    try{   
        app
        await dbConnection()
        await runConsumer()
    }catch(error:any){
        console.log(error,"_____failed to config auth-service");
    }finally{
        process.on("SIGINT", () => { 
            console.log("\n server is shutting down")
            process.exit();  
          });
    }
})()

