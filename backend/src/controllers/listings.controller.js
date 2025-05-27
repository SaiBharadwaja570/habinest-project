import { Listings as List } from "../models/listings.models.js";
import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadImageOnCloudinary  from "../utils/cloudinary.js";
import getCoordinatesFromAddress from "../utils/geocode.js";
import mongoose from "mongoose";
import fs from 'fs'

const getPGs = asyncHandler(async (req, res) => {

  const { name, address, minPrice, maxPrice, sharingType, gender} = req.query;

  const filter = {};

  if(name){
    // $regex --- regular expression used by mongo to match with the fields
    // $options: "i" --- ignore case
    filter.name = { $regex: name, $options: "i" }; 
  }

  if(address){
    filter.address = { $regex: address, $options: "i" }; 
  }

  const priceFilter = {};
  if (minPrice) priceFilter.$gte = parseInt(minPrice);
  if (maxPrice) priceFilter.$lte = parseInt(maxPrice);
  if (Object.keys(priceFilter).length > 0) {
    filter.priceRange = priceFilter;
  }

  if(gender){
    filter.gender = { $regex: gender, $options: "i" }
  }

  if(sharingType){
    filter.sharingType = { $regex: sharingType, $options: "i" }
  }

  const pgs = await List.find(filter);
  
  // if(!pgs || pgs.length == 0) throw new ApiError(404, "Pgs not found");
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
  const pgExist = await List.findOne({ $or: [{ name }] });
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
  console.log(list)
  const ownerId = req.user._id;
  const updatedUser = await User.findByIdAndUpdate(
    ownerId,
    { $push: { myPg: list._id } },
    { new: true }
  ).select("-password");
  return res.status(201).json(new ApiResponse(201, { list, owner: updatedUser }, "PG is registered and linked to owner"))
});

const getSinglePG = async (req, res)=>{
  const id=req.params.id;
  let pg=await List.findById(id);
  if(!pg)
  {
    return res.status(404).json(new ApiError(404, "PG not found"));
  }
  res.status(200).json(new ApiResponse(200, pg, "pg fetched successfully"))
}

const getOwnerPGs = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("myPg");
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  const pgListings = await List.find({ _id: { $in: user.myPg } });
  return res
    .status(200)
    .json(new ApiResponse(200, pgListings, "Owner's PGs fetched successfully"));
});

const deletePg = asyncHandler(async (req, res) => {
  const pgId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(pgId)) {
    throw new ApiError(400, "Invalid PG ID");
  }

  const userId = req.user._id;

  // Check if the PG exists and is owned by the user
  const pg = await List.findById(pgId);
  if (!pg) {
    throw new ApiError(404, "PG not found");
  }

  // Check if the PG is in the user's myPg list
  const user = await User.findById(userId);
  if (!user.myPg.includes(pgId)) {
    throw new ApiError(403, "You are not authorized to delete this PG");
  }

  // Delete the PG from List model
  await List.findByIdAndDelete(pgId);

  // Remove PG ID from user's myPg list
  user.myPg = user.myPg.filter((id) => id.toString() !== pgId);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "PG deleted successfully"));
});


const updatePG = asyncHandler(async (req, res) => {
  const pgId = req.params.id;
  const { name, address, priceRange, sharingType, gender } = req.body;

  // Validate PG ID
  if (!mongoose.Types.ObjectId.isValid(pgId)) {
    throw new ApiError(400, "Invalid PG ID");
  }
  const userId = req.user._id;

  // Check if the PG exists and is owned by the user
  const existingPg = await List.findById(pgId);
  if (!existingPg) {
    throw new ApiError(404, "PG not found");
  }

  // Check if the PG is in the user's myPg list
  const user = await User.findById(userId);
  if (!user.myPg.includes(pgId)) {
    throw new ApiError(403, "You are not authorized to update this PG");
  }

  // Check if updating name conflicts with another PG (excluding current PG)
  if (name && name.trim() !== existingPg.name) {
    const nameConflict = await List.findOne({ 
      name: name.trim(), 
      _id: { $ne: pgId } 
    });
    if (nameConflict) {
      throw new ApiError(409, "PG with this name already exists");
    }
  }

  // Prepare update object
  const updateData = {};
  
  // Update basic fields if provided
  if (name?.trim()) updateData.name = name.trim();
  if (address?.trim()) updateData.address = address.trim();
  if (priceRange) updateData.priceRange = priceRange;
  if (sharingType?.trim()) updateData.sharingType = sharingType.trim();
  if (gender?.trim()) updateData.gender = gender.trim();

  // Handle photo update if new photo is provided
  if (req.files?.photo?.[0]?.path) {
    const localImagePath = req.files.photo[0].path;
    console.log("New image path:", localImagePath);
    
    const imageUrlOnCloudinary = await uploadImageOnCloudinary(localImagePath);
    updateData.photo = imageUrlOnCloudinary.url;
  }

  // Handle address change - update coordinates if address is being updated
  if (address?.trim() && address.trim() !== existingPg.address) {
    const coordinatesResult = await getCoordinatesFromAddress(address.trim());
    if (!coordinatesResult?.lat || !coordinatesResult?.lon) {
      throw new ApiError(400, "Could not determine valid coordinates for the new address.");
    }

    const latitude = parseFloat(coordinatesResult.lat);
    const longitude = parseFloat(coordinatesResult.lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new ApiError(400, "Invalid latitude or longitude values.");
    }

    updateData.location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
  }

  // Update the PG
  const updatedPG = await List.findByIdAndUpdate(
    pgId,
    updateData,
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPG, "PG updated successfully"));
});

export {
    getPGs,
    createPG,
    getSinglePG,
    getOwnerPGs,
    updatePG,
    deletePg
}