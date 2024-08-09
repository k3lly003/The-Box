import { Schema, model, models } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  number: { type: String, required: true },
});

const contactModel = models.Contact || model("Contact", contactSchema);
export default contactModel;
