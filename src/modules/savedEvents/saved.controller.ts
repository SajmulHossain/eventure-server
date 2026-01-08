import { catchAsync } from "@utils/catchAsync";
import { SavedEventServices } from "./saved.service";
import { JwtPayload } from "jsonwebtoken";

const createSave = catchAsync(async (req, res) => {
  const { id } = req.params;
    const user_id = (req.user as JwtPayload)?.id;
    
    const data = await SavedEventServices.createSave(user_id, id);

    res.status(201).json({
       message: "Event saved successfully",
       data,
    });
});

const isSaved = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user_id = (req.user as JwtPayload)?.id;

    const data = await SavedEventServices.isSaved(user_id, id);

    res.status(200).json({
        message: "Event is saved status fetched successfully",
        data,
    });
});

export const SavedEventController = {
  createSave,
  isSaved,
};