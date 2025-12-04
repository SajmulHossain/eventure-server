import dotenv from "dotenv";

dotenv.config();

interface IEnv {
  port: string;
  db_uri: string;
  node_env: string;
  google_client_id: string;
  google_client_secret: string;
  google_callback_url: string;
  bcrypt_salt_rounds: string;
  frontend_url: string;
  jwt_access_secret: string;  
  jwt_refresh_secret: string;
  jwt_access_expiry: string;
  jwt_refresh_expiry: string;
  cloudinary_api_key: string;
  cloudinary_api_secret: string;
  cloudinary_cloud_name:  string;
  express_session_secret: string;
}

const envs = [
  "PORT",
  "DB_URI",
  "NODE_ENV",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
  "BCRYPT_SALT_ROUNDS",
  "FRONTEND_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "JWT_ACCESS_EXPIRY",
  "JWT_REFRESH_EXPIRY",
  "CLOUDINARY_API_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "EXPRESS_SESSION_SECRET",
];

const loadEnv = (): IEnv => {
  envs.forEach((env) => {
    if (!process.env[env]) {
      throw new Error(env + " not found!!! at env config...");
    }
  });

  return envs.reduce((acc, env) => ({
      ...acc,
      [env.toLowerCase()]: process.env[env] as string,
    }), {} as IEnv);
};

export default loadEnv();
