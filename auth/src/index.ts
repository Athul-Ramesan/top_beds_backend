import dbConnection from "./_boot/dbConnection";
import app from "./presentation";

(async()=>{
    try{   
        app
        await dbConnection()
    }catch(error:any){
        console.log(error,"_____failed to config auth service");
    }finally{
        process.on("SIGINT", () => { 
            console.log("\n\n server is shutting down")
            process.exit();  
          });
    }
})()
