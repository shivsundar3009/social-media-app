import User from "../models/user.model.js";
import bcrypt  from 'bcrypt';
// import upload from '../middlewares/multer.middleware.js'
import uploadImage from "../utils/profilePictureCloudinary.js";

export const getAllUsers = async (req , res) => {
    try {

        const users = await User.find({});

        if(users.length === 0) {
            return res.status(404).json({message: "no users found"});
        };

        res.status(200).json(users);
        
    } catch (error) {

        res.status(500).json({message: "error in gettingUsers" , error: error.message });
        
    };
};

export const getUserById = async (req , res) => {

    try {

        const {userId} = req.params;
        
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({message: "user not found"});
        };
        
        res.status(200).json({user  , success: true});

        
    } catch (error) {

        res.status(500).json({message: "error in getting user by id" , error: error.message });
        
    }
};

export const checkIfUserExists = async (req , res) => {

    try {

        const {email , phoneNumber} = req.body;

        const userExists = await User.findOne({
            $or : [
                {email},
                {phoneNumber},
            ]
        })
        
        if(userExists?.email === email) {
            return res.status(200).json({success: false , message: "email already exists"});
        }
        
        if(userExists?.phoneNumber === phoneNumber) {
            return res.status(200).json({success: false , message: "phoneNumber already exists"});
        }
        
        res.status(200).json({success: true , message: "user does not exist"});
    } catch (error) {

        res.status(500).json({message: "error in checking user existence" , error: error.message });
        
    }

};

export const createUser = async (req , res) => {
    try {
        const {fullName , userName , email , phoneNumber , age , gender , password , profilePicture} = req.body;

        // console.log('data recieved in backend :' ,req.file , userName) ;

        let profileImageUrl = null;

        const folder = `social-media/users/${userName}/profilePic`

        if (req.file) {
            const cloudinaryResponse = await uploadImage(req.file , folder);
            profileImageUrl = cloudinaryResponse.secure_url; // Get the URL of the uploaded image
            console.log(profileImageUrl);
        } else {
            profileImageUrl = profilePicture
        }

        // console.log(profilePicture);


        // const isFullNameAlreadyExists = await User.findOne( {fullName} );

        // if(isFullNameAlreadyExists) {
        //     return res.status(400).json({message: "fullName already exists"});
        // };

        // const isUserNameAlreadyExists = await User.findOne( {userName} );   
        
        // if(isUserNameAlreadyExists) {
        //     return res.status(400).json({message: "userName already exists"});
        // };
        
        // const isEmailAlreadyExists = await User.findOne( {email} );
        
        // if(isEmailAlreadyExists) {
        //     return res.status(400).json({message: "email already exists"});
        // };

        // console.log(phoneNumber);

        // const isPhoneNumberAlreadyExists = await User.findOne({phoneNumber});
        
        // console.log("phoneNUmber: " ,isPhoneNumberAlreadyExists);

        // if(isPhoneNumberAlreadyExists) {
        //     return res.status(400).json({message: "phoneNumber already exists"});
        // };

        const existingUser = await User.findOne( {
            $or: [
                // {fullName},
                {userName},
                // {email},
                // {phoneNumber},
            ]
        })

        if(existingUser) {
            // if(existingUser.fullName === fullName) {
            //     return res.status(400).json({message: "fullName already exists"});
            // }
            if(existingUser.userName === userName) {
                return res.status(400).json({message: "userName already exists" , success: false});
            }
            // if(existingUser.email === email) {
            //     return res.status(400).json({message: "email already exists"});
            // }
            // if(existingUser.phoneNumber === phoneNumber) {
            //     return res.status(400).json({message: "phoneNumber already exists"});
            // } 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword);
        
        const user = new User({ fullName, userName, email, phoneNumber, age, gender, password : hashedPassword , profilePicture : profileImageUrl});

        await user.save();

        res.status(201).json({message: "user created successfully" , success : true});


        
    } catch (error) {

        res.status(500).json({message: "error in creating user", error: error.message ,success : false});
        
    };
};


export const deleteUser = async (req , res) => {
    try {

        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);

        if(!user) {
            return res.status(404).json({message: "user not found"});
        };
        
        res.status(200).json({message: "user deleted successfully" , success : true});
        
    } catch (error) {

        res.status(500).json({message: "error in deleting user", error: error.message });
        
    };
};

export const followUser = async (req , res) => {

    try {
 
        console.log(req);

        const { toBeFollowedUserId } = req.params;

        console.log(toBeFollowedUserId);

        const { _id : loggedInUserId} = req.loggedInUser ;

        console.log(loggedInUserId);

        let loggedInUserData

        let toBeFollowedUserData

        if(toBeFollowedUserId) {
            toBeFollowedUserData   = await User.findById({ _id : toBeFollowedUserId} ).select('followers following') 
        };
        
        if( loggedInUserId) {
                loggedInUserData = await User.findById({ _id : loggedInUserId} ).select('followers following') 
        };

         if( loggedInUserData?.following?.includes(toBeFollowedUserId)){

            console.log("inside LOOP" , loggedInUserData.following);

            console.log(" you are already following")

         } else {

            loggedInUserData.following.push(toBeFollowedUserId);

            toBeFollowedUserData.followers.push(loggedInUserId);

            Promise.all([await loggedInUserData.save() , await toBeFollowedUserData.save()])

            console.log("you are not following");
  
         };
    
        // console.log("loggedInUserData" , loggedInUserData);
        
        // console.log("toBeFollowedUserData" , toBeFollowedUserData);

        res.status(200).json({ message : "user Followed successfully" , success : true});
        
    } catch (error) {

        res.status(500).json({message: "error in following user", error: error.message , success: false});
        
    }
    
}

export const unFollowUser = async (req , res) => {

    try {

        console.log(req);

        const { toBeUnFollowedUserId } = req.params;

        console.log(toBeUnFollowedUserId);

        const { _id : loggedInUserId} = req.loggedInUser ;

        console.log(loggedInUserId);

        let loggedInUserData

        let toBeUnFollowedUserData

        if(toBeUnFollowedUserId) {
            toBeUnFollowedUserData   = await User.findById({ _id : toBeUnFollowedUserId} ).select('followers following') 
        };
        
        if( loggedInUserId) {
                loggedInUserData = await User.findById({ _id : loggedInUserId} ).select('followers following') 
        };
         
        if(loggedInUserData?.following?.includes(toBeUnFollowedUserId)){
            console.log("following");
        } else {
            console.log("not following");
        }

        res.status(200).json({data : 'working unfollow' , success : true});
        
    } catch (error) {

        res.status(500).json({message: "error in unfollowing user", error: error.message });
        
    }

}