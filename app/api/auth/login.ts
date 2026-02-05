import { NextApiRequest,NextApiResponse } from "next";
import Users from "@/app/admin/models/Users";
import connection from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export default  async function ( req:NextApiRequest ,res:NextApiResponse){

    if(req.method!=="POST"){
        return res.status(405).json({message:"methode not allowed"})

    }
    try{
        await connection();

        const {email,password}=req.body;
        if(!email || !password){
            res.status(405).json({message:"all filed are required"});
        }
        const user = await Users.findOne({email}).select("password");
        if (!user)return res.status(400).json({message:" invalid credentials "});

        const passwordcheck = await bcrypt.compare(password,user.password)
        if (!passwordcheck){
            return res.status(400).json({message: "invalide credenatial you information does not match "})
        }

        const token =jwt.sign(
            {
                id:user._id ,role:user.role
            },process.env.JWT_SECRET as string,
            {expriresIn:"7n"}
        )
        res.status(200).json({message:"successful login",token})



    }catch(error){
        res.status(500).json({message:"server error"});
        console.error()

    }
   
}