import mongoose from "mongoose";
import { createDefaultAdmin } from "./createDefaultAdmin";


const mongodbUrl = process.env.MONGODB_URI as string;
const mongodbName = process.env.MONGODB_NAME as string;

if (!mongodbUrl) {
  throw new Error("MONGODB_URI is missing");
}
if (!mongodbName) {
  throw new Error("MONGODB_NAME is missing");
}

let isConnected = false;

export default async function connection() {
  if (isConnected || mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(mongodbUrl, {
      dbName: mongodbName,
    });

    isConnected = true;
    console.log("DATABASE CONNECTED SUCCESSFULLY");

  
    await createDefaultAdmin();

    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    await connection();

    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().ping();
    }

    return true;
  } catch (error) {
    console.error(" MongoDB ping failed:", error);
    return false;
  }
}
