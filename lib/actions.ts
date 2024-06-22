"use server";
import { auth, signIn, signOut } from "@/auth";
import connectDB from "./db";
import { v2 as cloudinary } from "cloudinary";
import Message, { MessageDocument } from "@/models/message-model";
import Chat, { ChatDocument } from "@/models/chat-model";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

// both for signin and signup
export async function authAction() {
  try {
    await signIn("github");
  } catch (error: any) {
    if (error.message == "NEXT_REDIRECT") {
      throw error;
    }
    return error.message;
  }
}

export const logoutAction = async () => {
  "use server";
  await signOut();
};

export const sendMessageAction = async (
  receiverId: string,
  content: string,
  messageType: "text" | "image"
) => {
  try {
    const session = await auth();
    if (!session) return;

    await connectDB();
    const senderId = session.user._id;

    let uploadedResponse;
    if (messageType === "image") {
      uploadedResponse = await cloudinary.uploader.upload(content);
    }

    const newMessage: MessageDocument = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content: uploadedResponse?.secure_url || content,
      messageType,
    });
    // console.log(newMessage);

    let chat: ChatDocument | null = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      chat?.messages?.push(newMessage._id);
      await chat.save();
    }

    // REVALIDATE PATH SHOULD BE ADDED TO HERE

    return newMessage;
  } catch (error: any) {
    console.log("Send message cloudinary error\n", error);
    throw error;
  }
};
