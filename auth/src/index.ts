import dbConnection from "./_boot/dbConnection";
import { runConsumer } from "./infrastructure/database/messages/kafka/consumer";
import app from "./presentation";

(async()=>{

    
    try{   
        app
        await dbConnection()
        await runConsumer().then((result)=>{
            console.log(result);
            console.log('kafka is running');
        }).catch(err=>{
            console.log(err);
            console.log('errror in kafka consumer');
        })
    }catch(error:any){
        console.log(error,"_____failed to config auth-service");
    }finally{
        process.on("SIGINT", () => { 
            console.log("\n\n  server is shutting down")
            process.exit();  
          });
          
    }
})()

