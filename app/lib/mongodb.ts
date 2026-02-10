import mongoose from "mongoose";
import { createDefaultAdmin } from "./createDefaultAdmin";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_NAME = process.env.MONGODB_NAME!;

if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");
if (!MONGODB_NAME) throw new Error("MONGODB_NAME is missing");

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const globalForMongoose = globalThis as unknown as { mongoose: MongooseCache };

if (!globalForMongoose.mongoose) globalForMongoose.mongoose = { conn: null, promise: null };
const cached = globalForMongoose.mongoose;

export default async function connection() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: MONGODB_NAME }).then(m => m);
  }

  cached.conn = await cached.promise;
  console.log("✅ DATABASE CONNECTED SUCCESSFULLY");

  // Create default admin
  await createDefaultAdmin();

  return cached.conn;
}

// Optional ping test
export async function testConnection(): Promise<boolean> {
  try {
    const conn = await connection();
    if (conn.connection.db) await conn.connection.db.admin().ping();
    return true;
  } catch {
    return false;
  }
}
