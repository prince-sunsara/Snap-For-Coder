import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User, { UserInterface } from "@/models/user-model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = auth();
    if (!session) return;
    await connectDB();

    const users: UserInterface[] = await User.find();
    // filter the authenticated users
    const filteredUsers = users.filter(
      (user) => user._id.toString() !== session.user._id.toString()
    );

    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.log("Error in get-users route handler: ", error);
    throw error;
  }
};
