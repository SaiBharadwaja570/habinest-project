import { v2 as cloudinary } from "cloudinary";
import fs from 'fs' 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageOnCloudinary =async (req,res,next) => {

    try {
      console.log(req.file)
      const localPath=req.file?.path;
      if (!localPath) {
        return res.status(400).json({success:false, message:`No file uploaded ${localPath}`});
      }
      const result= await cloudinary.uploader.upload(localPath,{
        resource_type:"auto"
      })
      req.photo=result;
      fs.unlinkSync(localPath);
      console.log(req.photo)
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({success:false, message:`Failed to upload image to cloudinary: ${error.message}`});
    }
};

export default uploadImageOnCloudinary;