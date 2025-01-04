import express, { Express } from "express";
import cors from "cors"
import dotenv from "dotenv"
import { connectToDB } from "./config/db"
import postRoutes from './Routes/postRoutes'
import dalleRoutes from './Routes/dalleRoutes'


dotenv.config()
const app: Express = express();
const port: string = process.env.PORT || '5000';
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}

app.use("/api/v1/post",postRoutes)
app.use("/api/v1/dalle",dalleRoutes)

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cors(corsOptions))

connectToDB()

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})