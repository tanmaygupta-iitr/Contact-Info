//THIS FILE IS TO WRITE ALL THE LOGIC FOR ALL THE ROUTES.
import asyncHandler from 'express-async-handler';
import { Contact } from '../models/contact.models.js';
//Desc: get all contacts
//api: /api/contacts/
//access: private
export const getAllController=asyncHandler(async(req,res)=>{
    const contacts =await Contact.find({user_id:req.user.id});
    //we want it to show contacts with respect to a particular user id ( a unique user(that's how contact applications work. you can't store same contacts for every user. there's no choice in that!));

    res.status(200).send(contacts);
})

//Desc: get one contact
//api: /api/contacts/
//access: private
export const getOneController=asyncHandler(async (req,res)=>{
    const contactObj= await Contact.findById(req.params.id);
    if(!contactObj){
        res.status(404);
        throw new Error("Contact Not Found!");
    }
    res.status(200).send(contactObj);
})

//Desc: create contact
//api: /api/contacts/
//access: private
export const postController=asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body;
    if(!name ||!email ||!phone){
        res.status(400);
        throw new Error("All feilds are mandatory!");
    }
    const contactObj=await Contact.create({name,email,phone,user_id: req.user.id});
    
    res.status(201).json(contactObj);
})

//Desc: update contact
//api: /api/contacts/:id
//access: private
export const putController=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("You are not Authorized to have access to other User's contacts!");
    }
    
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true}
    );
    res.status(200).json(updatedContact);
})

//Desc: delete one contact
//api: /api/contacts/:id
//access: private
export const deleteController=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("You are not Authorized to have access to other User's contacts!");
    }
    const deletedContact=await Contact.findByIdAndDelete(req.params.id);
    res.status(200).send(`Deleted contact ${deletedContact}`);
})
