import dotenv from 'dotenv'
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}`),
});

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
  cloudinary_cloud_name: string;
  express_session_secret: string;
  ssl_store_id: string;
  ssl_store_pass: string;
  ssl_payment_api: string;
  ssl_validation_api: string;
  ssl_success_backend_url: string;
  ssl_fail_backend_url: string;
  ssl_cancel_backend_url: string;
  ssl_ipn_url: string;
  ssl_success_frontend_url: string;
  ssl_fail_frontend_url: string;
  ssl_cancel_frontend_url: string;
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
  "SSL_STORE_ID",
  "SSL_STORE_PASS",
  "SSL_PAYMENT_API",
  "SSL_VALIDATION_API",
  "SSL_SUCCESS_BACKEND_URL",
  "SSL_FAIL_BACKEND_URL",
  "SSL_CANCEL_BACKEND_URL",
  "SSL_IPN_URL",
  "SSL_SUCCESS_FRONTEND_URL",
  "SSL_FAIL_FRONTEND_URL",
  "SSL_CANCEL_FRONTEND_URL",
];

const loadEnv = (): IEnv => {
  envs.forEach((env) => {
    if (!process.env[env]) {
      throw new Error(env + " not found!!! at env config...");
    }
  });

  return envs.reduce(
    (acc, env) => ({
      ...acc,
      [env.toLowerCase()]: process.env[env] as string,
    }),
    {} as IEnv
  );
};

export default loadEnv();
