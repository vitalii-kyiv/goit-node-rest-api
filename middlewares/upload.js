import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = nanoid();
    console.log("uniquePrefix", uniquePrefix);
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = { fileSize: 1024 * 1024 * 5 };

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split(".").pop();
  console.log("extension", extension);
  if (extension !== "png" && extension !== "jpg") {
    return cb(HttpError(400, "Only .png or .jpg extension are allow"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
