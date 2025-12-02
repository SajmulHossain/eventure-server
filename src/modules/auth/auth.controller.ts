import { ApiError } from "@utils/ApiError";
import { catchAsync } from "@utils/catchAsync";

const googleCallbackController = catchAsync(async(req, res ) => {
    let redirectTo = (req.query.state as string) || "";

    if(redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }

    const user = req.user;

    if(!user) {
        throw new ApiError(404, "User not found");
    }
});

export const AuthController = {
    googleCallbackController
};