import cloudinary from "../config/cloudinary";
import { development } from "../environments/development";

const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
const imageSize = 1024;

interface ImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination?: string;
  filename?: string;
  path?: string;
}

export const checkImage = (image: ImageFile) => {
  if (!fileTypes.includes(image.mimetype))
    return {
      status: false,
      message: "Image formats supported: JPG, PNG, JPEG",
    };

  if (image.size / 1024 > imageSize)
    return {
      status: false,
      message: `Image size should be less than ${imageSize / 1024}kb`,
    };

  return {
    status: true,
    message: "",
  };
};

export const convertToBase64Image = (image: ImageFile) =>
  `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

export const getUrlFromCloudinary = async (base64Image: string) => {
  const { url } = await cloudinary.uploader.upload(base64Image, {
    folder: development.cloudinaryFolderName,
  });

  return url;
};
