import mongoose, { Schema, mongo } from "mongoose";
import Book from "./bookTypes";

const bookSchema = new Schema<Book>(
	{
		title: { type: String, required: true },
		description: { type: String },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		genre: { type: String },
		coverImage: { type: String, required: true },
		file: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<Book>("Book", bookSchema);
