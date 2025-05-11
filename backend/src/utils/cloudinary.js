// Require the cloudinary library
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs' // used for hadling files, performing operations like read, write, etc.

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageOnCloudinary = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      resource_type: 'auto'
    };

    try {
      if(!imagePath) return null;

      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log("File uploaded successfully: " ,result.url);
      return result;
    } catch (error) {
      // If the files are not uploaded, they will present on the server which may be corrupted, to remove such anomaly we use
      fs.unlinkSync(imagePath)  
      console.error(error);
      return null;
    }
};

export default uploadImageOnCloudinary;