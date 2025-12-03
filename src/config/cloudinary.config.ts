import {v2 as cloudinary} from 'cloudinary';
import envConfig from './env.config';
import { ApiError } from '@utils/ApiError';

cloudinary.config({
    cloud_name: envConfig.cloudinary_cloud_name,
    api_key: envConfig.cloudinary_api_key,
    api_secret: envConfig.cloudinary_api_secret,
});


export const deleteImageFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
    const match = url.match(regex);

    if (match && match[1]) {
      const public_id = match[1];
      await cloudinary.uploader.destroy(public_id);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ApiError(400, "Cloudinary image deletion failed");
  }
};

export const cloudinaryUpload = cloudinary;