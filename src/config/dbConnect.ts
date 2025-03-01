import mongoose from "mongoose";
import { development } from "../environments/development";

const { mongoURL } = development;

(async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURL);
    console.log("DB connect Successfully");
  } catch (error) {
    console.log(`Error to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
})();
