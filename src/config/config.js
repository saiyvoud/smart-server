import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const URL_DATABASE = process.env.URL_DATABASE;
const CLOUDNAME_CLOUDINARY  = process.env.CLOUDNAME_CLOUDINARY ;
const API_KEY_CLOUDINARY  = process.env.API_KEY_CLOUDINARY ;
const SECRETE_KEY_CLOUDINARY = process.env.SECRETE_KEY_CLOUDINARY;
const SECRETE_KEY = process.env.SECRETE_KEY;

export {
  PORT,
  URL_DATABASE,
  CLOUDNAME_CLOUDINARY ,
  API_KEY_CLOUDINARY ,
  SECRETE_KEY_CLOUDINARY,
  SECRETE_KEY,
};
