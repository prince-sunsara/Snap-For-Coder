import mongoose, { Document, Model, Schema, Types, model } from "mongoose";

export interface ChatInterface {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}

export interface ChatDocument extends ChatInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<ChatDocument>(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat: Model<ChatDocument> =
  mongoose.models?.Chat || model("Chat", chatSchema);

export default Chat;
