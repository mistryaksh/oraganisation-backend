import * as mongoose from "mongoose";
import { IGalleryProps } from "types";

const GallerySchema = new mongoose.Schema<IGalleryProps>(
     {
          title: { type: mongoose.Schema.Types.String, required: true },
          image: { type: mongoose.Schema.Types.String, required: true },
          description: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     }
);

export const Gallery = mongoose.model<IGalleryProps>("Gallery", GallerySchema);
