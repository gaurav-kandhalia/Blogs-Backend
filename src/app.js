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


app.use((err, req, res, next) => {
  if (err.name === "ZodError") {
    console.log("Zod validation error:...............", err.issues[0]?.message);
    return res.status(400).json({
      success: false,
      
      message: err.issues[0]?.message || "Validation error",
      
      errors: err.errors || [],
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});




export default app;