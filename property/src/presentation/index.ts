import express, { Application, NextFunction, Request, Response } from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { routes } from "../infrastructure/routes"
import { dependencies } from "@/_boot/dependencies"
import bodyParser from 'body-parser'
import {NotFoundError, errorHandler} from 'topbeds-package'
// import { routes } from "../infrastructure/database/routes"



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

app.use("/", routes(dependencies))
app.all("*", (req:Request,res:Response,next:NextFunction)=>{

    next(new NotFoundError())
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`<< Property service connected to Port ${PORT} >>`);
})

export default app