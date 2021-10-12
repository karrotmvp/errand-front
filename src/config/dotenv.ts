import dotenv from "dotenv";
dotenv.config();

const envs = {
  BASE_URL: process.env.REACT_APP_BASE_URL || "",
  PRESET: process.env.REACT_APP_PRESET || "",
  APP_ID: process.env.REACT_APP_ID || "",
};

export default envs;
