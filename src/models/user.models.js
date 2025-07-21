import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    username:{
        type: String,
        required: [true ,"please add the username"]
    },
    email:{
        type: String,
        required: [true ,"please add the username"],
        unique: [true, "email already registered"]
    },
    password:{
        type: String,
        required: [true, "please add the user password!"]}
        
},{timestamps:true})

export const User=mongoose.model("User",userSchema);