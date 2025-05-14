import { v2 as cloudinary } from "cloudinary";
import fs from 'fs' 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageOnCloudinary =async (localFilePath) => {
  try {
    if(!localFilePath) return null;
    const response = await cloudinary.uploader.upload(
      localFilePath,
      { resource_type: "auto" }
    )
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    if (localFilePath) {
      try {
        fs.unlinkSync(localFilePath);
        console.log("Successfully deleted local file after Cloudinary failure:", localFilePath);
      } catch (unlinkError) {
        console.error("Error deleting local file after Cloudinary failure:", unlinkError);
      }
    }
  }
}

export default uploadImageOnCloudinary;