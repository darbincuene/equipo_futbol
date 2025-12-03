"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // obtener extensión original
        const ext = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});
const fileFilter = (req, file, cb) => {
    const allowed = /jpg|jpeg|png|gif/;
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
        cb(null, true);
    }
    else {
        cb(new Error("Formato no permitido. Usa jpg, jpeg, png o gif."));
    }
};
const upload = (0, multer_1.default)({ storage: storage,
    fileFilter: fileFilter
});
exports.default = upload;
