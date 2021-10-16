import { model, Schema } from "mongoose";
import { UserType } from "../types";

const UserSchema = new Schema<UserType>({
  userID: { type: String, required: true, unique: true },
  cooldowns: { type: Object, default: {} },
  premium: { type: Boolean, default: false },
});

export const UserModel = model("users", UserSchema);
