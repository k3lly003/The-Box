import { Schema, model, models } from "mongoose";

const docSchema = new Schema({
  name: { type: String, required: true, unique: true },
  file: { type: String, required: true },
  shortNote: { type: String, required: true }
});

const docModel = models.Document || model("Document", docSchema);
export default docModel;
