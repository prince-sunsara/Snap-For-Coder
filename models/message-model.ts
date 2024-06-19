import mongoose, {
  Document,
  Model,
  Schema,
  Types,
  model,
  mongo,
} from "mongoose";

export interface MessageInterface {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  messageType: "text" | "images";
  opened: boolean;
}

export interface MessageDocument extends MessageInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<MessageDocument>({
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
    enum: ["text", "images"],
    required: true,
  },
  opened: {
    type: Boolean,
    default: false,
  },
});

const Message: Model<MessageDocument> =
  mongoose.models?.Message || model("Message", messageSchema);
export default Message;
