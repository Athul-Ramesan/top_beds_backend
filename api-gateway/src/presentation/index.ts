
import express, { Application } from "express";
import cors from "cors"
import { setupLogging } from "@/logging";
import { setupProxies } from "@/Proxy";
import { ROUTES } from "@/Routes";

const app: Application = express()
const corsOptions = {
    origin: 'https://topbeds.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

app.use(cors(corsOptions))
setupLogging(app)
setupProxies( app, ROUTES)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Gateway server is running at ${PORT} 🔥`);
})

export default app