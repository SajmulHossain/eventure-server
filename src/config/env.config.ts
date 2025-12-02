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
}

const envs = ["PORT", "DB_URI", "NODE_ENV", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_CALLBACK_URL", "BCRYPT_SALT_ROUNDS"];

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
