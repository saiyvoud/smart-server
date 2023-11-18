import cloudinary from "cloudinary";

import {
     CLOUDNAME_CLOUDINARY ,
     API_KEY_CLOUDINARY  ,
     SECRETE_KEY_CLOUDINARY 
} from "./config.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
cloudinary.config({
  cloud_name: CLOUDNAME_CLOUDINARY,
  api_key:  API_KEY_CLOUDINARY,
  api_secret: SECRETE_KEY_CLOUDINARY,
});

const UploadImage = async (files,filename, oldImage) => {
  try {
    if(!files) return "";
    if (oldImage !== undefined) {
      const spliturl = oldImage.split("/");
      const img_id = spliturl[spliturl.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(img_id);
    }
  
   const base64 = files.toString("base64");
    const imgPath = `data:image/jpeg;base64,${base64}`;
    const cloudinaryUpload = await cloudinary.uploader.upload(imgPath, {
      public_id: filename,
      resource_type: "auto",
    });
    return cloudinaryUpload.url;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export default UploadImage;
