import mongoose from "mongoose";
import { IContactProps } from "types";

const ContactSchema = new mongoose.Schema<IContactProps>(
     {
          phone: { type: mongoose.Schema.Types.String, required: true },
          email: { type: mongoose.Schema.Types.String, required: true },
          address: { type: mongoose.Schema.Types.String, required: true },
          openfrom: { type: mongoose.Schema.Types.String, required: true },
          userId: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     }
);

export const Contact = mongoose.model<IContactProps>("Contact", ContactSchema);
