import mongoose, { Schema } from "mongoose";
import type { IUser } from "../../constant/types";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: [Number],
    default: []
  },
},
  {
    timestamps: true
  });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
