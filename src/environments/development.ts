import * as dotenv from "dotenv";

dotenv.config();

const {
  APP_PORT,
  MONGO_URL,
  JWT_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_CLOUD_API_KEY,
  CLOUDINARY_CLOUD_API_SECRET,
  CLOUDINARY_FOLDER_NAME,
} = process.env;

export const development = {
  production: false,
  appPort: APP_PORT,
  mongoURL: MONGO_URL,
  jwtKey: JWT_KEY,
  cloudinaryCloudName: CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: CLOUDINARY_CLOUD_API_KEY,
  cloudinaryApiSecret: CLOUDINARY_CLOUD_API_SECRET,
  cloudinaryFolderName: CLOUDINARY_FOLDER_NAME,
};
