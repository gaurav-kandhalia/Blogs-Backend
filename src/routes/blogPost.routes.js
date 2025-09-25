import { Router } from "express";


const blogRouter = Router();
import { createBlogPost,getAllPost,getPostById,updatePost } from "../controllers/blogs.controllers.js";

blogRouter.post("/createPost", createBlogPost);
blogRouter.get("/getAllPosts", getAllPost);
blogRouter.get("/getPost", getPostById);
blogRouter.post("/updatePost", updatePost);

export default blogRouter;
