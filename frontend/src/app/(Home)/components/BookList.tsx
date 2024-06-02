import { Book } from "@/app/types";
import React from "react";
import BookCard from "./BookCard";

const BookList = async () => {
	const res = await fetch(`${process.env.BACKEND_URL}/books`, {});
	if (!res.ok) {
		throw new Error("error occured while getting books");
	}
	const books = await res.json();

	return (
		<div className="max-w-5xl mx-auto grid grid-cols-1 md: grid-cols-3 gap-8">
			{books.map((book: Book) => {
				return <BookCard key={book?._id} book={book} />;
			})}
		</div>
	);
};

export default BookList;
