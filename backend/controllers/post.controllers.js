import {Post } from "../models/post.model.js";
import { uploadToCloudinary } from "../utils/postsCloudinary.js";

// Get all posts

// Get post by ID

export const getAllPosts = async (req, res) => {
  try {
    // Default page is 1 and limit is 10
    const page = parseInt(req.query.page) || 1;
    const limit = 10;  // Fixed limit for each page

    // Fetch total count of posts for pagination
    const totalPosts = await Post.countDocuments();

    const totalPages = Math.ceil(totalPosts / limit);

    const nextPage = page < totalPages ? page + 1 : null; //
  

    // Fetch paginated posts
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("owner" , " userName profilePicture");


    // Send response with pagination info and posts
    res.json({
      success: true,
      totalPosts,
      totalPages,
      currentPage: page,
      posts,
      nextPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch posts." });
  }
};

// Create a new post

export const createPost = async (req , res) => {

    try {

        const { owner , userName ,  caption } = req.body;
 
         const media = req.files;
         
        const folder = `social-media/users/${userName}/posts`

        let mediaType = null;

        console.log('mediaTped outside', mediaType);

         console.log(media);

         const mediaArray = await uploadToCloudinary(media , folder);

         console.log(mediaArray);

         const newPost = new Post({owner , caption , media : mediaArray });
         await newPost.save();
         res.status(201).json({message: "post created successfully", success : true , post : newPost});
        
        
    } catch (error) {

        res.status(500).json({ message: "Error in creating post", success : false , error });
        
    }

};

// delete a post

// bookmark a post

// like a post





