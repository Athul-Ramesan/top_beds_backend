
import { register } from "tsconfig-paths"
register({
    baseUrl: __dirname,
    paths: { '@/*': ['*'] },
    addMatchAll: false,
})

import app from "@/presentation"

(async()=>{
    try {
         app
    }catch(error:any){
        console.error(error,"_____failed to config gateway service");
        
    }finally{
        process.on("SIGINT", () => { 
            console.log("\n\n server is shutting down")
            process.exit();  
          });
    }
})()