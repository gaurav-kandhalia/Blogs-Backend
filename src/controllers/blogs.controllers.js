import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import BlogPost from '../models/blogPost.model.js';
import { postSchema,updatePostSchema } from '../validations/post.validations.js';

export const createBlogPost = asyncHandler(async (req, res) => {
    const validatedData = postSchema.parse(req.body);
     
    const newPost = new BlogPost(validatedData);
    if (!newPost) {
        throw new ApiError(400, "Error in creating post")
    }
    const savedPost = await newPost.save();
    res.status(201).json(new ApiResponse(201,savedPost,"Blog post created successfully",true));
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
    res.status(200).json(new ApiResponse(200, {posts,totalPosts:posts.length},"All blog posts fetched successfully",true));
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
    res.status(200).json(new ApiResponse(200,  post,"Blog post fetched successfully",true));
});

export const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.query;
        const validatedData = postSchema.parse(req.body);
    if (!id) {
        throw new ApiError(400, "Post ID is required")
    }
    const post = await BlogPost.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    post.title = validatedData.title || post.title;
    post.content = validatedData.content || post.content;
    post.author = validatedData.author || post.author;
    const updatedPost = await post.save();
    res.status(200).json(new ApiResponse(200,  updatedPost,"Blog post updated successfully",true));
});


export const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.query;
    if (!id) {
        throw new ApiError(400, "Post ID is required")
    }
     const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(new ApiResponse(200, null,"Blog post deleted successfully",true));
});