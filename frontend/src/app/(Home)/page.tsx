import Banner from "./components/Banner";
import BookList from "./components/BookList";
import { Suspense } from "react";

export default function Home() {
	return (
		<>
			<Banner />
			<Suspense fallback={<h2>Loading...</h2>}>
				<BookList />
			</Suspense>
		</>
	);
}
