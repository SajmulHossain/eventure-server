interface IEnv {
  port: string;
  db_uri: String;
}

const envs = ["PORT", "DB_URI"];

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
