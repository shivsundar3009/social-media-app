import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import { generateJwtToken } from '../utils/generateJwtToken.js';

export const userLogin = async (req, res) => {
    try {
        const { identifier , password} = req.body;

        console.log(identifier);

        const user = await User.findOne({
          $or: [
            // { fullName: { $eq: identifier } },  // Ensure exact match
            { userName: { $eq: identifier } },  // Ensure exact match
            { email: { $eq: identifier } },    // Ensure exact match
            { phoneNumber: { $eq: identifier } } // Ensure exact match
          ]
        }).populate("posts savedPosts");

        console.log(user);

        if (!user) return res.status(404).json({ message: "User not found" , success: false });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        console.log(isPasswordCorrect);

        if(!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });  // Return unauthorized if password is incorrect
        }
           
        const payload = { _id : user._id};

        const jwtToken = generateJwtToken(payload);

        console.log(jwtToken);

        const { password : userPass , ...userData} = user.toObject();
        
        res.status(200).cookie("token" ,jwtToken , {
            httpOnly: true,
            secure: true,
            sameSite: "none"  // for cross-browser compatibility in some cases
        }).json({message: "user successfullly logged In" , success : true , userData});

        // res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error in user login", error , success : false });
    }
};


export const userLogout = async (req,res) => {

    try {

     // remove the token from the cookie
        res.clearCookie("token").json({message: "user successfully logged out"});

        
    } catch (error) {

        res.status(500).json({message : "error logging out User" , error})
        
    }

};

export const updateOnRefresh = async (req,res) => {

    try {
        console.log("update on refresh working....0");

        const {_id: loggedInUserId} = req.loggedInUser;

        console.log("loggedInUserId in asyncTHUNK", loggedInUserId);

        if(!loggedInUserId){
            return res.status(401).json({ message: "Unauthorized Please Log In Again", success : false });  // Return unauthorized if no token is present in the request header
        }

       const user = await User.findById(loggedInUserId).select('-password').populate("posts savedPosts");

        if (!user) return res.status(404).json({ message: "User not found" , success :false});

    
        res.status(200).json({message : "User updated successfully" , success : true , user});
      } catch (error) {
        console.log("error in updatte ON refresh" , error);
        res.status(500).json({ message: "Invalid token"  , error: error.message , success:false });
      }

};