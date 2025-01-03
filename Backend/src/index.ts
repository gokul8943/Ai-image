import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const port: string = process.env.PORT || '5000';
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cors(corsOptions))

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})