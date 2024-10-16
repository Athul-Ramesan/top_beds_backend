import express, { Application, NextFunction, Request, Response } from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { routes } from "../infrastructure/database/routes"
import { dependencies } from "../_boot/dependencies"
import { NotFoundError } from "topbeds-package"
import errorHandler from "../_lib/middleware/errorHandle"


config()
const app: Application = express()
const PORT: number = Number(process.env.PORT)

const corsOptions = {
    origin: 'https://topbeds.vercel.app' ,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// app.get('/',(req:Request, res:Response)=>{
//     res.status(200).json({message:"<< Auth service is running ! >>"})
// })
app.use("/", routes(dependencies))
app.all("*", (req:Request,res:Response,next:NextFunction)=>{

    next(new NotFoundError())
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`<< Auth service connected to Port ${PORT} >>`);
})

export default app