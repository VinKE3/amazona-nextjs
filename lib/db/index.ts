import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  mongoose.set("strictQuery", false); // 🔹 Agrega esta línea antes de conectar

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI);

  cached.conn = await cached.promise;

  return cached.conn;
};
