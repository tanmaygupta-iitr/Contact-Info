import asyncHandler from 'express-async-handler'
import jwt, { decode } from 'jsonwebtoken'


//Now for a private route to get current user's info, the user must pass it's access token along with the route as a token of verification. This middleware will be used to validate wether the token used is a valid token of the users. This the logic for the private routes.

export const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.authorization||req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not Authorized!");
            }
            req.user=decoded.user;
            next();
        })
        if(!token){
            res.status(401);
            throw new Error("The user is not authorized or token is missing");
        }
    }
})
