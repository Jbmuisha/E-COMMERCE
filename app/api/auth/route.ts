import { NextApiRequest ,NextApiResponse } from "next";
import connection from "@/app/lib/mongodb";
import Users from "@/app/admin/models/Users";
import bcrypt from "bcryptjs"
export default async function Sigin_Handler(req:NextApiRequest,res:NextApiResponse){
    if( req.method!=="POST"){
        return res.status(405).json({message:"methode not allowed"});

    }
    try{
        await connection()
        const {username,email,password}=req.body;
        if (!username || !email || !password ) {
            return res.status(400).json({message:" all filed are required"});
            
        }
        const exitingUser= await Users.findOne({})
        if(exitingUser){
            res.status(400).json({message: "Email already exist"});

        }
        const hashedpassword = await bcrypt.hash(password,10)
        const user = await Users.create({username, email,password:hashedpassword});
        res.status(201).json({message:" user created sussfully" , userId: user._id})


    } catch(error){
        console.error(error)
        res.status(500).json({message: "server error"})

    }
    
}