import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/app/admin/models/Users";
import connection from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function verifyAdmin(req: NextApiRequest) {
  const auth = req.headers.authorization;
  if (!auth) throw new Error("Unauthorized");

  const token = auth.split(" ")[1];
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  if (decoded.role !== "Admin") {
    throw new Error("Forbidden");
  }

  return decoded;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connection();
    verifyAdmin(req);

    
    if (req.method === "GET") {
      const users = await Users.find().select("-password");
      return res.status(200).json(users);
    }

  
    if (req.method === "POST") {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "All fields required" });
      }

      const exists = await Users.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await Users.create({
        username,
        email,
        password: hashedPassword,
        role,
      });

      return res.status(201).json(user);
    }


    if (req.method === "PUT") {
      const { id, username, email, role } = req.body;

      const user = await Users.findByIdAndUpdate(
        id,
        { username, email, role },
        { new: true }
      ).select("-password");

      return res.status(200).json(user);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error: any) {
    console.error(error.message);
    return res.status(401).json({ message: error.message });
  }
}
