import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import BlogPost from '../models/blogPost.model.js';

export const createBlogPost = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content) {
        throw new ApiError(400, "Title and Content are required");
    }
    const newPost = new BlogPost({ title, content, author });
    if (!newPost) {
        throw new ApiError(400, "Error in creating post")
    }
    const savedPost = await newPost.save();
    res.status(201).json(new ApiResponse(201, "Blog post created successfully", savedPost));
});


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllPost = asyncHandler(async (req, res) => {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    if (posts.length === 0) {
        res.statu(200).json(new ApiResponse(200, "No posts available", []));
    }
    if (!posts) {
        throw new ApiError(404, "No posts found")
    }
    res.status(200).json(new ApiResponse(200, "All blog posts fetched successfully", {posts,totalPosts:posts.length},true));
});

export const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.query;
    if(!id){
        throw new ApiError(400,"Post ID is required")
    }
    const post = await BlogPost.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    res.status(200).json(new ApiResponse(200, "Blog post fetched successfully", post,true));
});

export const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const { title, content, author } = req.body;
    if (!id) {
        throw new ApiError(400, "Post ID is required")
    }
    const post = await BlogPost.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    post.title = title || post.title;
    post.content = content || post.content;
    post.author = author || post.author;
    const updatedPost = await post.save();
    res.status(200).json(new ApiResponse(200, "Blog post updated successfully", updatedPost,true));
});
