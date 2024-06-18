import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User, { UserInterface } from "@/models/user-model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();

    if (!session) return;
    await connectDB();

    const users: UserInterface[] = await User.find();
    // filter the authenticated users
    // console.log(users[0]._id.toString());

    const filteredUsers = users.filter(
      (user) => user?._id !== session?.user?._id
    );

    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.log("Error in get-users route handler: ", error);
    throw error;
  }
};
