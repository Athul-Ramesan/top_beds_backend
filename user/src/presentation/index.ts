import express, { Application, NextFunction, Request, Response } from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dependencies } from "../_boot/dependencies"
import { routes } from "@/infrastructure/routes"
import { NotFoundError, errorHandler } from "topbeds-package"
import bodyParser from 'body-parser'
// import { routes } from "../infrastructure/database/routes"
// import { dependencies } from "../_boot/dependencies"


config()
const app: Application = express()
const PORT: number = Number(process.env.PORT)


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}
app.use(cors(corsOptions));

app.use(express.json(
    { limit: '100mb' }
));
app.use(bodyParser.json(
    {limit:"100mb"}
))
app.use(express.urlencoded({
    limit: "100mb",
    extended: true
}))
app.use(cookieParser());

// app.get('/',(req:Request, res:Response)=>{
//     res.status(200).json({message:"<< User service is running ! >>"})
// })
app.use("/", routes(dependencies))

app.all("*", (req:Request,res:Response,next:NextFunction)=>{

    next(new NotFoundError())
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`<< User service connected to Port ${PORT} >>`);
})

export default app