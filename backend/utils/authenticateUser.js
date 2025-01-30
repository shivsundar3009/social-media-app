import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    try {
        const { token } = req.cookies;


        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);

        // console.log("decoded user :" ,decoded);

        req.loggedInUser = decoded;

        next();
        
    } catch (error) {

         res.status(401).json({message : "unauthorized access" , error})
        
    }
}