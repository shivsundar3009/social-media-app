import User from "../models/user.model.js";

export const getMutualFollowers = async (req , res) => {

    try {

        console.log(req);

        const { _id : loggedInUserId} = req.loggedInUser ;

        console.log(loggedInUserId);

        let loggedInUserData

        if( loggedInUserId) {
                loggedInUserData = await User.findById({ _id : loggedInUserId} ).select('followers following') 
        }
    

        res.status(200).json({ data : loggedInUserData , success : true});
        
    } catch (error) {

        res.status(500).json({ message: "Error in getting mutual followers", error : error.message });
        
    }

}