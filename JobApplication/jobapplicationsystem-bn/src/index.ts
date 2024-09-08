import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

const start = async () => {

  console.log("starting.....");

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI env must be created");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO DATABASE");
  } catch (err) {
    console.log("this is mongodb error", err);
  }
};

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
start();
