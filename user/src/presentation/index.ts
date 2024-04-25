import express, { Application, Request, Response } from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dependencies } from "../_boot/dependencies"
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/',(req:Request, res:Response)=>{
    res.status(200).json({message:"<< Auth service is running ! >>"})
})
// app.use("/user", routes(dependencies))

app.listen(PORT, () => {
    console.log(`<< User service connected to Port ${PORT} >>`);
})

export default app