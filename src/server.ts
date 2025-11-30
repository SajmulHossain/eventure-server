import app from "./app";
import envConfig from "./config/env.config";

app.listen(5000, () =>{
    console.log(`Server is running at port: ${envConfig.PORT}`);
    console.log(envConfig);
})