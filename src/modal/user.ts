import * as mongoose from "mongoose";
import { IUserProps } from "types";

const UserSchema = new mongoose.Schema<IUserProps>(
     {
          username: { type: mongoose.Schema.Types.String, required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          password: { type: mongoose.Schema.Types.String, required: true },
          mobile: { type: mongoose.Schema.Types.String, required: true },
          role: { type: mongoose.Schema.Types.String, default: "ADMIN" },
     },
     {
          timestamps: true,
     }
);

export const User = mongoose.model<IUserProps>("User", UserSchema);
