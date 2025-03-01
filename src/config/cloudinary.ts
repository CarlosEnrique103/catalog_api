import { v2 as cloudinary } from "cloudinary";

import { development } from "../environments/development";

const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } =
  development;

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

export default cloudinary;
