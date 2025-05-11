import { Listings as List } from "../models/listings.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadImageOnCloudinary  from "../utils/cloudinary.js";
import axios from 'axios';


const getPGs = asyncHandler(async (req, res) => {
    const pgs = await List.find();
    if(!pgs || pgs.length == 0) throw new ApiError(401, "Pgs not found");
    return res
    .status(200)
    .json(new ApiResponse(200, pgs, "pgs fetched successfully!!"));
});



const createPG = asyncHandler(async (req, res) => {
    const { name, address, priceRange, sharingType } = req.body;

    if ( [name, address, priceRange, sharingType ].some((field) => field?.trim() ==='') ) throw new ApiError(400, 'Please fill all the fields')
    
    const pgExist = await List.findOne({ name })
    if (pgExist) throw new ApiError(409, "User already exists")

    // middlewares adds more fields in the request such that we can access them using multer through req.files
    const photoLocalPath = req.files?.photo[0]?.path;
    console.log(photoLocalPath);

    if (!photoLocalPath) throw new ApiError(400, "Photo is required")

    const photo =   await uploadImageOnCloudinary(photoLocalPath)

    if (!photo) throw new ApiError(500, "Photo not uploaded on cloudinary")

    const list = await List.create({
        name, 
        address, 
        priceRange, 
        sharingType,
        photo: photo.url
    })

    const isPGRegistered = await List.findById(list._id);

    if (!isPGRegistered) throw new ApiError(500, "Something went wrong while registering the PG")

    return res.status(201).json( new ApiResponse(
        201, 
        isPGRegistered, 
        "PG is registered"
    ) )

});



export {
    getPGs,
    getPGById,
    createPG
}