import { Listings as List } from "../models/listings.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadImageOnCloudinary  from "../utils/cloudinary.js";
import getCoordinatesFromAddress from "../utils/geocode.js";

const getPGs = asyncHandler(async (req, res) => {

  const { name, address, minPrice, sharingType, gender} = req.query;

  const filter = {};

  if(name){
    // $regex --- regular expression used by mongo to match with the fields
    // $options: "i" --- ignore case
    filter.name = { $regex: name, $options: "i" }; 
  }

  if(address){
    filter.address = { $regex: address, $options: "i" }; 
  }

  if(minPrice){
    // $gte --- greater than equals to
    filter.price = { $gte: parseInt(minPrice) }
  }

  if(gender){
    filter.gender = { $regex: gender, $options: "i" }
  }

  if(sharingType){
    filter.sharingType = { $regex: sharingType, $options: "i" }
  }

  const pgs = await List.find(filter);
  if(!pgs || pgs.length == 0) throw new ApiError(401, "Pgs not found");
  
  return res
    .status(200)
    .json(new ApiResponse(200, pgs, "pgs fetched successfully!!"));
});

const createPG = asyncHandler(async (req, res) => {
    const { name, address, priceRange, sharingType } = req.body;
  
    if ([name, address, priceRange, sharingType].some((field) => field?.trim() === '')) {
      throw new ApiError(400, 'Please fill all the fields');
    }
  
    const pgExist = await List.findOne({ name });
    if (pgExist) throw new ApiError(409, "PG with this name already exists");
  
    const photoLocalPath = req.files?.photo?.[0]?.path;
    if (!photoLocalPath) throw new ApiError(400, "Photo is required");
  
    const photo = await uploadImageOnCloudinary(photoLocalPath);
    if (!photo) throw new ApiError(500, "Photo not uploaded on cloudinary");
  
    const coordinates = await getCoordinatesFromAddress(address);
    if ( !coordinates || coordinates.length !== 2 ) {
      throw new ApiError(400, "Could not determine coordinates for the address.");
    }
  
    const list = await List.create({
      name,
      address,
      priceRange,
      sharingType,
      photo: photo.url,
      location: {
        type: 'Point',
        coordinates
      }
    });
  
    return res.status(201).json(new ApiResponse(201, list, "PG is registered"));
  });

  

export {
    getPGs,
    createPG
}