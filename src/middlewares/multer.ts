import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config";


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "jugadores",
      allowed_formats: ["jpg", "png", "jpeg", "gif"],
      transformation: [{ width: 500, height: 500, crop: "limit" }],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});



const upload = multer({
  storage: storage, 
});

export default upload;
