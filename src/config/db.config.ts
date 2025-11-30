import mongoose from "mongoose"
import envConfig from "./env.config"

export const connectDB = async () => {
   try {
     await mongoose.connect(envConfig.db_uri as string);
     console.log("DB Connected!");
   } catch (error) {
    console.log(error);
    process.exit(1);
   }
}

export const disconnectDB = async() =>{
    await mongoose.connection.close();
}