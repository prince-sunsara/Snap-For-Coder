import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export default async function connectDB() {
  // have connection ?
  if (cachedConnection) {
    console.log("Using catched MongoDB Connection");
    return cachedConnection;
  }

  // don't have any connection
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/snap-for-coder"
    );
    cachedConnection = conn.connection;

    console.log("Successfully connected to database");
    return cachedConnection;
  } catch (error) {
    console.log("Database connectivity error", error);
    return process.exit(0);
  }
}
