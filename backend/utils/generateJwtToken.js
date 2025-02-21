import jwt from "jsonwebtoken";

export const generateJwtToken = (payload ) => {
    try {

     const token = jwt.sign(payload , process.env.JWT_SECRET_KEY, {expiresIn: "1m"})

     return token
        
    } catch (error) {

        console.log("Error generating JWT token : ", error);
        return error
        
    }
}