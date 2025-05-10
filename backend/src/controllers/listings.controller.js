import { Listings as List } from "../models/listings.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getPGs = asyncHandler(async (req, res) => {
    const { name, address, price, sharingType } = req.body;



});

const getPGById = asyncHandler(async (req, res) => {
    
});

const createPG = asyncHandler(async (req, res) => {
    const { name, address, price, sharingType } = req.body;

    if ( [name, address, price, sharingType ].some(i => i==='') ) throw new ApiError(400, 'Please fill all the fields')

    
});

export {
    getPGs,
    getPGById
}