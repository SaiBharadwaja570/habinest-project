import Visit from "../models/visit.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createVisit = async(req,res) => {
    const {name, email, phone, date}=req.body;
    const pgId=req.params.id;
    console.log(pgId)
    if (!email || !name || !phone || !date) {
        throw new ApiError(400, "All fields are required");
    }
    const data={
        name,
        email,
        phone,
        date,
        pgId
    }
    const newVisit = await Visit.create(data);
    if(newVisit)
    {
        return res.status(201).json(new ApiResponse(201, "Visit created"));
    }
    return res.status(500).json(new ApiResponse(500, "Error making visit"))
}

const showVisit = async(req,res) => {
    const owner = req.user;
    const myPgIds = owner.myPg;
    if (!myPgIds || myPgIds.length === 0) {
        return res.status(200).json(new ApiResponse(200, "No PGs found for this user", []));
    }
    const visits = await Visit.find({ pgId: { $in: myPgIds } });
    return res.status(200).json(new ApiResponse(200, "Visits fetched", visits));
}

export{createVisit, showVisit}