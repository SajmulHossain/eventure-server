import envConfig from "@config/env.config";
import { hash } from "bcryptjs";

export const hashPassword = async (password: string) : Promise<string> => {
    const saltRounds = parseInt(envConfig.bcrypt_salt_rounds || "10", 10);

    return await hash(password, saltRounds);;
}