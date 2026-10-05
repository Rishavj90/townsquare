import multer from "multer";
import path from "node:path";
import fs from "node:fs/promises";

const _dirname = fs.mkdir("/backend/temp")
const storage = path.join("backend", "temp")


const upload = multer({
    dest:storage,
    

})