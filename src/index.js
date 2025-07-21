import express from 'express'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHANDLER } from './middleware/errorHandler.js';
import { connectDb } from './db/dbConnection.js';

dotenv.config();

const app=express();
const port =process.env.PORT || 8000
app.use(express.json());
app.use("/api/contacts",contactRoutes)
app.use("/api/users",userRoutes)
app.use(errorHANDLER);

connectDb()
app.listen(port,()=>{
console.log( "The server is running on port: ",port);
})
