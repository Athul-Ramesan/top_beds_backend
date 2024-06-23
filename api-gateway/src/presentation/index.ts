
import express, { Application } from "express";
import cors from "cors"
import { setupLogging } from "@/logging";
import { setupProxies } from "@/Proxy";
import { ROUTES } from "@/Routes";

const app: Application = express()
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors(corsOptions))
setupLogging(app)
setupProxies( app, ROUTES)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Gateway server is running at ${PORT} 🔥`);
})

export default app