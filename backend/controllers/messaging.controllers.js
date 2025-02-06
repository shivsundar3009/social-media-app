import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const getMutualFollowers = async (req , res , next) => {

    try {

        const { _id : loggedInUserId} = req.loggedInUser ;

        console.log("loggedInUserId",loggedInUserId);


        const loggedInUserData = await User.findById({ _id : loggedInUserId} ).select('followers following').populate('following') ;

        console.log(loggedInUserData);

        const usersFollowedByLoggedInUser = loggedInUserData.following ;

        console.log("usersFollowedByLoggedInUser" , usersFollowedByLoggedInUser);

        const mutualFollowers = usersFollowedByLoggedInUser.filter( (user) => {
                return  user.following.includes(loggedInUserId) ;
        } ).map( (user) => {
            return user._id ;
        })

        console.log(" mutualFollowers" ,mutualFollowers);

        req.mutualFollowers = mutualFollowers ;

        next();

    } catch (error) {

        res.status(500).json({message: "error in getting mutual followers", error: error.message });
        
    }

 };

 export const sayHi = async ( req , res) => {

    try {
        
        const { _id : loggedInUserId } = req.loggedInUser;
        
        console.log("loggedInUserId" , loggedInUserId);

        const { mutualFollowerId } = req.params;

        console.log(" mutualFollower"  , mutualFollowerId);

        if(!mutualFollowerId) {
            return res.status(400).json({message: "mutual follower id is required", success : false });
        }

        const conversation = await Conversation.find({
            participants : {
                $all : [loggedInUserId, mutualFollowerId]
            }
        });

        if(conversation.length > 0) {
            return res.status(400).json({message: "Already a conversation exists", success : false });
        }

        const messageText  = "HIII";

        const newMessage = new Message({
            sendersId : loggedInUserId,
            receiversId : mutualFollowerId,
            messageText 
        });

        await newMessage.save();

        console.log('sayHi', newMessage);

        const newConversation = new Conversation({
            participants : [loggedInUserId, mutualFollowerId],
            messages : [newMessage._id]
        })
        
        await newConversation.save();

        console.log('sayHi', newConversation);

        res.status(200).json({ message : "sayHi successfull" , success : true});
    } catch (error) {
        
     res.status(500).json({message: "error in sayHi", error: error.message , success : false});
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

        const conversation = await Conversation.findOne({
            participants : {
                $all : [sendersId, receiversId]
            }
        });

        console.log("conversation" , conversation);

        if(conversation?.length == 0){
            return res.status(400).json({message: "No conversation found", success : false });
        }

        let newMessage = new Message();

        if(sendersId && receiversId && messageText) {
            newMessage = new Message({
                sendersId : sendersId,
                receiversId : receiversId,
                messageText
            });

            await newMessage.save();

            conversation.messages.push(newMessage._id);

            await conversation.save();

        }
        
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