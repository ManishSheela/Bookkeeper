import express, { Request, Response, NextFunction } from "express";
import bookModel from "./bookModel";
import createHttpError from "http-errors";
import { AuthRequest } from "../utils/constant";
import {
	deleteFileFromCloudinary,
	fileManipulationForCloudinaryUpload,
	updateFileOnCloudinary,
} from "../utils/cloudinaryFile";

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
	const list = await bookModel.find().populate("author", "name").sort({ createdAt: -1 });
	return res.send(list);
};
const getSingleBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { bookId } = req.params;
	try {
		const book = await bookModel
			.findOne({ _id: bookId })
			.populate("author", "name");
		if (!book) {
			return next(createHttpError(404, "Book not found"));
		}
		return res.json(book);
	} catch (err) {
		return next(createHttpError(500, "Error while fetching book"));
	}
};

const createBook = async (req: Request, res: Response, next: NextFunction) => {
	const { title, author, genre } = req.body;

	const files = req?.files as { [filename: string]: Express.Multer.File[] };
	if (!files)
		return next(createHttpError(400, "Please attach coverImage and file!"));
	// upload cover image on cloudinary
	const coverImage = files?.coverImage?.[0];
	const coverSecureURL = await fileManipulationForCloudinaryUpload({
		file: coverImage,
		type: "image",
	});
	// upload file on cloudinary
	const file = files?.file?.[0];
	const fileSecureURL = await fileManipulationForCloudinaryUpload({
		file: file,
		type: "raw",
	});

	const _req = req as unknown as AuthRequest;

	try {
		const newBook = await bookModel.create({
			title,
			author: _req?.userId,
			genre,
			coverImage: coverSecureURL,
			file: fileSecureURL,
		});
		return res.status(201).json({ id: newBook._id });
	} catch (err) {
		return next(createHttpError(500, `${err}`));
	}
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
	const { title, genre } = req.body;
	const { bookId } = req.params;

	const _req = req as unknown as AuthRequest;

	const files = req?.files as { [filename: string]: Express.Multer.File[] };

	const book: any = await bookModel.findOne({ _id: bookId });
	if (!book) return next(createHttpError(404, "Book not found!"));

	if (book?.author != _req.userId)
		return next(createHttpError(403, "You can not upload file!"));
	// update file on cloudinary
	const coverImage = files?.coverImage?.[0];
	let coverSecureURL;
	if (files?.coverImage) {
		coverSecureURL = await updateFileOnCloudinary({
			file: coverImage,
			type: "image",
		});
		await deleteFileFromCloudinary(book?.coverImage, "image");
	}
	const file = files?.file?.[0];
	let fileSecureURL;
	if (files?.file) {
		fileSecureURL = await updateFileOnCloudinary({
			file: file,
			type: "raw",
		});
		await deleteFileFromCloudinary(book?.file, "raw");
	}

	// database calling
	const updatedBook = await bookModel.findOneAndUpdate(
		{ _id: bookId },
		{
			title: title,
			genre: genre,
			coverImage: coverSecureURL ? coverSecureURL : book.coverImage,
			file: fileSecureURL ? fileSecureURL : book.file,
		},
		{
			new: true,
		}
	);
	// deleting file from database and cloudinary

	return res.json(updatedBook);
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
	const { bookId } = req.params;
	const _req = req as unknown as AuthRequest;

	try {
		const book: any = await bookModel.findOne({ _id: bookId });

		if (!book) {
			return next(createHttpError(404, "Book not found"));
		}

		if (book?.author != _req.userId)
			return next(createHttpError(403, "You can not delete file!"));

		const coverImagePublicId = await deleteFileFromCloudinary(
			book?.coverImage,
			"image"
		);
		const filePublicId = await deleteFileFromCloudinary(book?.file, "raw");
		if (coverImagePublicId && filePublicId) {
			await bookModel.deleteOne({ _id: bookId });
			res.status(200).json({ message: "file deleted" });
		} else
			return next(createHttpError(500, "Deletion Operation on book failed"));
	} catch (err) {
		return next(createHttpError(500, "Error while fetching book"));
	}
};
export { createBook, updateBook, getAllBooks, getSingleBook, deleteBook };
