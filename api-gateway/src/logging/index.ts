import { Application } from "express"
import morgan from "morgan"

const setupLogging = (app:Application)=>{
    console.log("👉 inside morgan");
    
    app.use(morgan("combined"))
}

export {setupLogging}