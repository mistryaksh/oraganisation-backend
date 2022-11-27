import mongoose from "mongoose";
import { IAboutProps } from "types";

const AboutSchema = new mongoose.Schema<IAboutProps>({
     ownerName: { type: mongoose.Schema.Types.String, required: true },
     ownerImage: { type: mongoose.Schema.Types.String, required: true },
     ownerWords: { type: mongoose.Schema.Types.String, required: true },
     teamates: [{ teamateId: { type: mongoose.Schema.Types.ObjectId, ref: "Teamates", required: true } }],
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const About = mongoose.model<IAboutProps>("About", AboutSchema);
