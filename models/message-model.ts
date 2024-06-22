import mongoose, {
  Document,
  Model,
  PopulatedDoc,
  Schema,
  Types,
  model,
} from "mongoose";
import { UserDocument } from "./user-model";

export interface MessageInterface {
  sender: Types.ObjectId | PopulatedDoc<UserDocument>;
  receiver: Types.ObjectId | PopulatedDoc<UserDocument>;
  content: string;
  messageType: "text" | "images";
  opened: boolean;
}

export interface MessageDocument extends MessageInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<MessageDocument>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message: Model<MessageDocument> =
  mongoose.models?.Message || model("Message", messageSchema);
export default Message;
