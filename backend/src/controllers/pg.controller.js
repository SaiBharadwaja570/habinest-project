import PG from '../models/pg.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getPGs = asyncHandler(async (req, res) => {
    try {
        const pgs = await PG.find();
        return res.status(200).json(new ApiResponse(200, { data: pgs }, "PGs fetched successfully!"));
    } catch (error) {
        throw new ApiError(500, "Internal server error! PGs not fetched!");
    }
});


const getPGById = asyncHandler(async (req, res) => {
    try {
        const pg = await PG.findById(req.params.id);
        if (!pg) throw new ApiError(404, "PG not found!");
        return res.status(200).json(new ApiResponse(200, { data: pg }, "PG fetched successfully!"));
    } catch (error) {
        throw new ApiError(500, "Internal server error! PG not fetched!");
    }
});

const createPG = asyncHandler(async (req, res) => {
    try {
        
    } catch (error) {
        throw new ApiError(500, "Internal server error! PG not created!");
    }
});