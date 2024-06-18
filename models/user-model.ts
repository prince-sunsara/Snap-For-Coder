import { Document, Model, Schema, model, models } from "mongoose";

export interface UserInterface {
  username: String;
  fullName: String;
  gid: String;
  avatar?: string;
}

export interface UserDocument extends UserInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    gid: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://i1.wp.com/hypebeast.com/image/ht/2015/02/you-can-now-play-music-while-recording-your-snapchats-0.jpg?w=516",
    },
  },
  {
    // created At, updated at
    timestamps: true,
  }
);

const User: Model<UserDocument> = models?.User || model("User", userSchema);

export default User;
