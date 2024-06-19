import Message, { MessageDocument } from "@/models/message-model";
import User, { UserDocument } from "@/models/user-model";

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
