import {Post } from "../models/post.model.js";
import { uploadToCloudinary } from "../utils/postsCloudinary.js";
import User from "../models/user.model.js";

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

       // we can also get the user from req.loggedInUser

        const { owner , userName ,  caption } = req.body;

        console.log('ownerID' , owner);
        
        let ownerData

        if(owner){
          ownerData = await User.findById(owner) ;
        }
        if(!ownerData){
          return res.status(404).json({ message: "User not found", success : false });
        };
        console.log('owner' , ownerData);

        const media = req.files;
         
        const folder = `social-media/users/${userName}/posts`

        let mediaType = null;

        console.log('mediaTped outside', mediaType);

         console.log(media);

         const mediaArray = await uploadToCloudinary(media , folder);

         console.log(mediaArray);

         const newPost = new Post({owner , caption , media : mediaArray });
         await newPost.save();

         ownerData.posts.push(newPost);
         await ownerData.save();

         res.status(201).json({message: "post created successfully", success : true});
        
        
    } catch (error) {

      console.log(error)

        res.status(500).json({ message: "Error in creating post", success : false , error });
        
    }

};

export const bookMarkPost = async (req , res) => {

  try {

    console.log('bookmarkPost req.loggedInUser', req.loggedInUser);

    const {_id : loggedInUserId } = req.loggedInUser;

    const loggedInUserData = await User.findById(loggedInUserId);
    
    if(!loggedInUserData) {
      return res.status(404).json({ message: "User not found", success : false });
    }
    
    const { postId } = req.params;

    if(!postId ){
      return res.status(400).json({ message: "postId is required", success : false });
    };

    loggedInUserData.savedPosts.push(postId);

    await loggedInUserData.save();


    console.log('inside bookMARKPOST' , loggedInUserId);



    res.status(200).json({message: "Post BookMarked successfully", success : true , loggedInUserData});
    
  } catch (error) {
    
    res.status(500).json({message : "error in bookMarkPost" , success : false , error })
  }

};

export const unBookMarkPost = async (req , res) => {

  try {

    console.log('bookmarkPost req.loggedInUser', req.loggedInUser);

    const {_id : loggedInUserId } = req.loggedInUser;

    const loggedInUserData = await User.findById(loggedInUserId);
    
    if(!loggedInUserData) {
      return res.status(404).json({ message: "User not found", success : false });
    }
    
    const { postId } = req.params;

    if(!postId ){
      return res.status(400).json({ message: "postId is required", success : false });
    };

    if( !loggedInUserData.savedPosts.includes(postId) ){
      return res.status(400).json({ message: "Post not found in saved posts", success : false });
    };

    loggedInUserData.savedPosts.remove(postId);

    await loggedInUserData.save();


    console.log('inside bookMARKPOST' , loggedInUserId);



    res.status(200).json({message: "Post unBookMarked successfully", success : true , loggedInUserData});
    
  } catch (error) {
    
    res.status(500).json({message : "error in unBookMarkPost" , success : false , error })
  }

};

export const likePost = async (req , res) => {

  try {

    console.log('likePost req.loggedInUser', req.loggedInUser);

    const {_id : loggedInUserId } = req.loggedInUser;

    const { postId } = req.params;

    if(!postId ){
      return res.status(400).json({ message: "postId is required", success : false });
    };

    const post = await Post.findById(postId);

    if(!post) {
      return res.status(404).json({ message: "Post not found", success : false });
    }

    if( post.likedBy.includes(loggedInUserId) ){
      return res.status(400).json({ message: "You have already liked this post", success : false });
    }

    post.likedBy.push(loggedInUserId);

    await post.save();

    res.status(200).json({message : "post liked  successfully" , success : true , post})
    
  } catch (error) {
    
    res.status(500).json({message : "error in likePost" , success : false , error })
    
  }

};

export const unLikePost = async (req , res) => {

  try {

    console.log('likePost req.loggedInUser', req.loggedInUser);

    const {_id : loggedInUserId } = req.loggedInUser;

    const { postId } = req.params;

    if(!postId ){
      return res.status(400).json({ message: "postId is required", success : false });
    };

    const post = await Post.findById(postId);

    if(!post) {
      return res.status(404).json({ message: "Post not found", success : false });
    }

    if( !post.likedBy.includes(loggedInUserId) ){
      return res.status(400).json({ message: "You have not liked this post", success : false });
    }

    post.likedBy.remove(loggedInUserId);

    await post.save();

    res.status(200).json({message : "post unLiked  successfully" , success : true , post})
    
  } catch (error) {
    
    res.status(500).json({message : "error in likePost" , success : false , error })
    
  }

};

// delete a post

// bookmark a post

// like a post





