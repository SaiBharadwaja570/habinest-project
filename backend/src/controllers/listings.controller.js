import { Listings as List } from "../models/listings.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadImageOnCloudinary  from "../utils/cloudinary.js";
import getCoordinatesFromAddress from "../utils/geocode.js";
import fs from 'fs'

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
  const { name, address, priceRange, sharingType, gender } = req.body;

  // Validation: ensure fields are present
  if (!name?.trim() || !address?.trim() || !sharingType?.trim() || !gender?.trim() || !priceRange) {
    throw new ApiError(400, 'Please fill all the fields');
  }

  // Check if PG already exists
  const pgExist = await List.findOne({ $or: [{ name }, { address }] });
  if (pgExist) throw new ApiError(409, "PG with this name already exists");

  // Validate file and upload to Cloudinary
  const localImagePath = req.files?.photo?.[0]?.path;
  if (!localImagePath) {
    throw new ApiError(400, "Image file (photo) is required");
  }

  console.log("localImagePath:", localImagePath);

  const imageUrlOnCloudinary = await uploadImageOnCloudinary(localImagePath);

  // Geocode the address
  const coordinatesResult = await getCoordinatesFromAddress(address);
  if (!coordinatesResult?.lat || !coordinatesResult?.lon) {
    throw new ApiError(400, "Could not determine valid coordinates for the address.");
  }

  const latitude = parseFloat(coordinatesResult.lat);
  const longitude = parseFloat(coordinatesResult.lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new ApiError(400, "Invalid latitude or longitude values.");
  }

  // Create PG listing
  const list = await List.create({
    name,
    address,
    priceRange,
    sharingType,
    photo: imageUrlOnCloudinary.url,
    gender,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
  });

  return res.status(201).json(new ApiResponse(201, list, "PG is registered"));
});



  

export {
    getPGs,
    createPG
}