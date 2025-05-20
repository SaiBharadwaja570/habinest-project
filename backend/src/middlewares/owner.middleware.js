import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isOwner = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.type != 'owner') {
        throw new ApiError(403, "Access denied. Owner only route.");
    }
    next();
});