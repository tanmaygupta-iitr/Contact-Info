import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken'

//desc@ We are setting up the logic and the route for the registration of the user
//request type: post
//access public
export const userRegister=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username ||!email ||!password){
        res.status(400);
        throw new Error("All feilds are mandatory!");
    }
    const userAlreadyThere=await User.findOne({email});
    if(userAlreadyThere){
        res.status(400);
        throw new Error("User Already Registered. Please try with a different Email!");
    }
    //Using bcrypt and hashing the password:
    const hashedPassword=await bcrypt.hash(password,10);
    //this 10 is the no of salt rounds, basically a salt is a random string that will be attached to your password and then hash will be used to encrypt it, no of salt rounds determine the number of times your password is being encrypted.

    //whenever a user is doing login. You NEVER EVER DECRYPT THE ORIGINAL PASSWORD. You always encrypt the password given by the user and then you compare with the actual Password.
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email
        });
    }
    else{
        res.status(400);
        throw new Error("User data is INVALID!");
    }
})

//desc@ We are setting up the logic and the route for the login of the user
//request type: post
//access public
export const userLogin=asyncHandler(async(req,res)=>{
//now we want to take the input of the username and password of the user and then find the username/email and then encrypt the password in the same way we did while registration and  compare it with the actual password. If it is correct, then we allow the access by giving a json web token as a token of verification. This token of verification is of 2 types:
//---->Access token: has 15 mins of time before expiry.(Usually Cookies)
//----> Refresh Token:  has 1 week of time before expiration
//After this time is expired. we have to verify again.
// This is the process of authentication.
    const {email,password}=req.body;
    if( !email || !password){
        res.status(400);
        throw new Error("Please enter all the details required!");
    }
    const userData=await User.findOne({email});
    if(!userData){
        res.status(404);
        throw new Error("User not Registered! Please register first!");
    }
    const isMatch=await bcrypt.compare(password,userData.password);
    
    if(isMatch){
        //If the password matches, you must now generate an accesstoken using the jwt.sign() method which takes the parameters as: (payload, access_token_secret,[options,callback]), options and callback are optional while the other 2 are necessary. You should not store sensitive info inside the token. The payload is the user's info , but don't store the sensistive info!

        const accessToken=jwt.sign(
            {
                user:{
                    username:userData.username,
                    email: userData.email,
                    id: userData.id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:"30m",
            }
        );
        res.status(200).json(
            {"message":"You have successfully logged in!",
            accesstoken:accessToken,
        });
    }
    else{
        res.status(401);
        throw new Error("Email Or Password is not VALID!");
    }
})

//desc@ We are setting up the logic and the route for the current info of the user
//request type: get
//access : private
export const userInfo=asyncHandler(async(req,res)=>{
    res.send(req.user);
})