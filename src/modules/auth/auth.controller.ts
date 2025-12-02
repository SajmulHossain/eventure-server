import envConfig from "@config/env.config";
import { ApiError } from "@utils/ApiError";
import { catchAsync } from "@utils/catchAsync";
import { setCookies } from "@utils/cookies";
import { createUserToken } from "@utils/token";

const googleCallbackController = catchAsync(async(req, res ) => {
    let redirectTo = (req.query.state as string) || "";

    if(redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }

    const user = req.user;

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const token = createUserToken(user);
    setCookies(res, token);
  
    res.redirect(`${envConfig.frontend_url}/${redirectTo}}`);
});

export const AuthController = {
    googleCallbackController
};