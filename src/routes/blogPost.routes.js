import { Router } from "express";


const blogRouter = Router();
import { createBlogPost,getAllPost,getPostById } from "../controllers/blogs.controllers.js";

blogRouter.post("/createPost", createBlogPost);
blogRouter.get("/getAllPosts", getAllPost);
blogRouter.get("/getPost", getPostById);

export default blogRouter;
