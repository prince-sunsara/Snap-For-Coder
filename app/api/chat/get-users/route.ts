import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User, { UserInterface } from "@/models/user-model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();
    // console.log(session); // for debugg

    if (!session) return;
    await connectDB();

    const users: UserInterface[] = await User.find({});
    const filteredUsers = users.filter(
      (user) => user.email !== session.user.email
    );
    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.log("Error in get-users route handler: ", error);
    throw error;
  }
};
