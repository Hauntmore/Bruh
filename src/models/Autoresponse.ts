import { model, Schema } from "mongoose";
import { AutoresponseType } from "../types";

const AutoResponseSchema = new Schema<AutoresponseType>({
    guildID: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
});

export const AutoResponseModel = model("autoresponses", AutoResponseSchema);