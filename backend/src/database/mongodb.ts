import mongoose from "mongoose";
import schemaNormalizer from "./schemas/plugins/normalizer";

mongoose.plugin(schemaNormalizer());

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!).then(() => console.log("✅ MongoDB connected!"));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
