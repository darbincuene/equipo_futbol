import multer from "multer";
import path from "path";
 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // obtener extensión original
    const ext = path.extname(file.originalname);

    cb(null, file.fieldname + "-" + uniqueSuffix + ext); 
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowed = /jpg|jpeg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Formato no permitido. Usa jpg, jpeg, png o gif."));
  }
};

const upload =multer({storage:storage,
    fileFilter:fileFilter
})
export default upload;
