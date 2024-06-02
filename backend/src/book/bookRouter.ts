import express from "express";
import {
	createBook,
	deleteBook,
	getAllBooks,
	getSingleBook,
	updateBook,
} from "./bookController";
import multer from "multer";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import authenticate from "../middlewares/authenticate";
const bookRouter = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, "../../public/data/uploads"));
	},
	filename: function (req, file, cb) {
		// Use original filename with a unique identifier
		const shortUuid = uuidv4().split("-")[0]; // Extract the first part of the UUID
		const uniqueFilename = `${shortUuid}_${file.originalname}`;
		cb(null, uniqueFilename);
	},
});

// Initialize multer upload with defined storage and limits
const upload = multer({
	storage: storage,
	limits: { fileSize: 1e7 },
});

bookRouter.post(
	"/addBook",
	authenticate,
	upload.fields([
		{ name: "coverImage", maxCount: 1 },
		{ name: "file", maxCount: 1 },
	]),
	createBook
);

bookRouter.patch(
	"/:bookId",
	authenticate,
	upload.fields([
		{ name: "coverImage", maxCount: 1 },
		{ name: "file", maxCount: 1 },
	]),
	updateBook
);

bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getSingleBook);
bookRouter.delete("/:bookId", authenticate, deleteBook);

export default bookRouter;
