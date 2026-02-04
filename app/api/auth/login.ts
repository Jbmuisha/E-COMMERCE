import { NextApiRequest ,NextApiResponse } from "next";
import connection from "@/app/lib/mongodb";
export default async function Login_Handler(req:NextApiRequest,res:NextApiResponse){
    if( req.method!=="POST"){
        return res.status(405).json({message:"methode not allowed"})
    }
}