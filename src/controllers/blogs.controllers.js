import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import BlogPost from '../models/blogPost.model.js';

export const createBlogPost = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content) {
        throw new ApiError(400, "Title and Content are required");
    }
    const newPost = new BlogPost({ title, content, author });
    console.log(".......................new post",newPost);
    if(!newPost){
        throw new ApiError(400,"Error in creating post")
    }
    const savedPost = await newPost.save();
    res.status(201).json(new ApiResponse(201, "Blog post created successfully", savedPost));
});
