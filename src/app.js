import express from 'express'
import cors from 'cors'
import morgan from 'morgan';

const app = express();

app.use(morgan("dev"))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({
    limit:"16kb",
    extended:true
}))

import blogRouter from './routes/blogPost.routes.js';

app.use("/api/v1/blogs",blogRouter)


export default app;