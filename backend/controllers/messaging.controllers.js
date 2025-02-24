import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import mongoose from "mongoose";

export const getMutualFollowers = async (req , res , next) => {

    try {

        const { _id: loggedInUserId } = req.loggedInUser;

console.log("loggedInUserId", loggedInUserId);

// Fetch logged-in user data along with 'following' details
const loggedInUserData = await User.findById({ _id: loggedInUserId })
  .select('followers following')
  .populate({
    path: 'following',
    select: 'userName profilePicture fullName following', // Select required fields
  });

console.log("loggedInUserData", loggedInUserData);

// Users followed by the logged-in user
const usersFollowedByLoggedInUser = loggedInUserData.following;

console.log("usersFollowedByLoggedInUser", usersFollowedByLoggedInUser);

// Find mutual followers with required fields
const mutualFollowers = usersFollowedByLoggedInUser
  .filter((user) => user.following.includes(loggedInUserId))
  .map((user) => ({
    _id: user._id,
    userName: user.userName,
    profilePicture: user.profilePicture,
    fullName: user.fullName,
  }));

console.log("mutualFollowers", mutualFollowers);

req.mutualFollowers = mutualFollowers;

next();

    } catch (error) {

        res.status(500).json({message: "error in getting mutual followers", error: error.message });
        
    }

 };

 export const getConversationsWithMutualFollowers = async (req , res) => {

    try {

        const { _id : loggedInUserId } = req.loggedInUser ;

        console.log("loggedInUserId",loggedInUserId);

        if(!loggedInUserId){
            return res.status(401).json({ message: "Unauthorized", success : false });
        }

        const mutualFollowers = req.mutualFollowers ;

        if(mutualFollowers.length == 0){
            return res.status(400).json({ message: "No mutual followers found", success : false });
        };

        console.log("mutualFollowers" , mutualFollowers);

        const conversations = await Conversation.find({
            participants: { 
                $all: [loggedInUserId], 
                $in: mutualFollowers
            }
        }).populate({
            path: "participants",
            match: { _id: { $ne: loggedInUserId } }, // this will only return otherUser
            select: "username fullName profilePicture",
          }).populate({
            path: "lastMessage",
            select: "content createdAt",
          });


        console.log("conversations" , conversations);

        const formattedConversations = conversations.map((conversation) => {
            const { participants, ...rest } = conversation.toObject(); 
            return {
                otherUser: participants[0], 
                ...rest
            };
        });


  
         
        res.status(200).json({message: "getConversationsWithMutualFollwers working properly" , success : true , mutualFollowers , formattedConversations});

        
    } catch (error) {

        res.status(500).json({message: "error in getting conversations with mutual followers", error: error.message });
        
    }

 };

 export const getConversationBetweenParticipants = async (req, res) => {
    try {
        const { _id: loggedInUserId } = req.loggedInUser;
        const { otherUserId } = req.params;

        if (!otherUserId) {
            return res.status(400).json({ message: "Other user ID is required", success: false });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [loggedInUserId, otherUserId] }
        }).populate("messages"); // ✅ Fully populated messages

        if (!conversation) {
            return res.status(404).json({ message: "No conversation found", success: false });
        }

        res.status(200).json({
            message: "Messages fetched successfully",
            success: true,
            messages: conversation.messages
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

 export const sayHi = async (req, res) => {
    try {
        const { _id: loggedInUserId } = req.loggedInUser;
console.log("loggedInUserId", loggedInUserId);

const { mutualFollowerId } = req.params;
console.log("mutualFollowerId", mutualFollowerId);

if (!mutualFollowerId) {
    return res.status(400).json({ message: "Mutual follower ID is required", success: false });
}

// Updated: Check if the mutual follower exists in the array (with user details)
const mutualFollowers = req.mutualFollowers;
console.log("mutualFollowers", mutualFollowers);

const mutualFollowerData = mutualFollowers.find(
    (user) => user._id.toString() === mutualFollowerId
);

if (!mutualFollowerData) {
    return res.status(400).json({ message: "Mutual follower not found", success: false });
}

// Check if a conversation already exists
const existingConversationCount = await Conversation.countDocuments({
    participants: { $all: [loggedInUserId, mutualFollowerId] }
});

if (existingConversationCount > 0) {
    return res.status(400).json({ message: "Conversation already exists", success: false });
}

// Create new message
const messageText = "HIII";
const newMessage = new Message({
    sendersId: loggedInUserId,
    receiversId: mutualFollowerId,
    messageText,
});

await newMessage.save();
console.log('New Message:', newMessage);

// Create new conversation
const newConversation = new Conversation({
    participants: [loggedInUserId, mutualFollowerId],
    messages: [newMessage._id],
    lastMessage: newMessage._id,
});

await newConversation.save();
console.log('New Conversation:', newConversation);

// Final response with mutual follower's details
res.status(200).json({
    message: "Say Hi successful",
    success: true,
    newConversation,
    newMessage,
    otherUserDetails: {
        _id: mutualFollowerData._id,
        userName: mutualFollowerData.userName,
        profilePicture: mutualFollowerData.profilePicture,
        fullName: mutualFollowerData.fullName,
    },
});
    } catch (error) {
        res.status(500).json({ message: "Error in sayHi", error: error.message, success: false });
    }
};



 export const getAllConversations = async (req ,res) => {

    try {

        console.log("loggedInUser" ,req.loggedInUser);

        const { _id : loggedInUserId } = req.loggedInUser ;

        const { mutualFollowers } = req ;

        console.log(" mutualFollowers"  , mutualFollowers);

        if(!mutualFollowers.length){
            return res.status(400).json({message: "No mutual followers found", success : false });
        }
        
        const allCoversations = await Conversation.find( {

            participants : {
                $all : [loggedInUserId] ,
                $in : mutualFollowers
            }

        })
   
        console.log(allCoversations);

        if(allCoversations.length == 0) {
            return res.status(400).json({message: "No conversations found", success : false });
        }

        res.status(200).json({ data : allCoversations  , message : "getAllConversations working" , success : true })
        
    } catch (error) {

         res.status(500).json({message: "error in getting all conversations", error: error.message });
        
    }

 };

 export const sendMessage = async ( req , res) => {
    try {

        
        const { _id : sendersId } = req.loggedInUser ;
        
        console.log("sendersId" , sendersId);

        const { messageText } = req.body;

        console.log("messageText" , messageText);

        const { receiversId } = req.params;

        console.log("receiversId" , receiversId);

        if (!sendersId || !receiversId || !messageText) {
            return res.status(400).json({
                message: "Sender ID, Receiver ID, and Message Text are required.",
                success: false
            });
        }

        const conversation = await Conversation.findOne({
            participants : {
                $all : [sendersId, receiversId]
            }
        });

        console.log("conversation" , conversation);

        if(!conversation){
            return res.status(400).json({message: "No conversation found", success : false });
        }

        const newMessage = new Message({
            sendersId,
            receiversId,
            messageText
        });
        
       res.status(200).json({data : {
        newMessage,
        conversation
       } , messsage : "working sendMessage" , success : true})

    } catch (error) {
         
        res.status(500).json({message: "error in sending message", error: error.message });
    }
 }

 export const getMessages = async (req , res) =>  {

    try {

        const {_id : sendersId } = req.loggedInUser;

        const { receiversId } = req.params;

        console.log(sendersId , receiversId);

        const conversation = await Conversation.findOne({
           participants: { $all : [sendersId,receiversId] }
        }).populate("messages");
          
        console.log(conversation);

         res.status(200).json({
           message:"successfull",
           conversation
         });

        // res.status(200).json({message: "successfull" , success : true });
     
    } catch (error) {
       
      res.status(400).json({
        success:"failed",
        error:error.message
      });
    }

}