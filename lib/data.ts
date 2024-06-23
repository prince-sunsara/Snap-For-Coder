import Message, { MessageDocument } from "@/models/message-model";
import User, { UserDocument } from "@/models/user-model";
import connectDB from "./db";
import Chat, { ChatDocument } from "@/models/chat-model";

export const getUsersForSidebar = async (authUserId: string) => {
  try {
    const allUsers: UserDocument[] = await User.find({
      _id: { $ne: authUserId },
    });

    const userInfo = await Promise.all(
      allUsers.map(async (user) => {
        const lastMessage: MessageDocument | null = await Message.findOne({
          $or: [
            { sender: user._id, receiver: authUserId },
            { sender: authUserId, receiver: user._id },
          ],
        })
          .sort({ createdAt: -1 })
          .populate("sender", "fullname avatar _id")
          .populate("receiver", "fullname avatar _id")
          .exec();

        return {
          _id: user._id,
          participants: [user],
          lastMessage: lastMessage
            ? {
                ...lastMessage.toJSON(),
                sender: lastMessage.sender,
                receiver: lastMessage.receiver,
              }
            : null,
        };
      })
    );

    return userInfo;
  } catch (error) {
    console.log("Error in getUserForSidebar: ", error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    await connectDB();
    const user: UserDocument | null = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log("Error in getUserProfile: ", error);
    throw error;
  }
};

export const getMessages = async (authUser: string, receiver: string) => {
  try {
    await connectDB();

    const chat: ChatDocument | null = await Chat.findOne({
      participants: { $all: [authUser, receiver] },
    }).populate({
      path: "messages",
      populate: {
        path: "sender",
        model: "User",
        select: "fullName",
      },
    });

    if (!chat) return [];

    const messages = chat.messages;
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
