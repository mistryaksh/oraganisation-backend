import * as mongoose from "mongoose";
import { IEventsProps } from "types/features/events.types";

const EventSchema = new mongoose.Schema<IEventsProps>(
     {
          pics: [{ type: mongoose.Schema.Types.String, required: true }],
          name: { type: mongoose.Schema.Types.String, required: true },
          description: { type: mongoose.Schema.Types.String, required: true },
     },
     {
          timestamps: true,
     }
);

export const Event = mongoose.model("Event", EventSchema);
