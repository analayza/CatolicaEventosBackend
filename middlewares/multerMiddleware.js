import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

function imageFilter(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) return cb(null, true);
    cb(new Error("Apenas arquivos de imagem são permitidos!"));
}

export const uploadImages = multer({
    storage,
    fileFilter: imageFilter,
});

export const uploadSingleImage = multer({
    storage,
    fileFilter: imageFilter,
});