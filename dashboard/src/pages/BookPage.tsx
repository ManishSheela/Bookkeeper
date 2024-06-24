import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { getBooks } from "@/services/UserService";
import { PATH_NAME } from "@/util/pathName";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, MoreHorizontal, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Book {
	_id: string;
	title: string;
	author: Author;
	genre: string;
	coverImage: string;
	file: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface Author {
	_id: string;
	name: string;
}

const BookPage = () => {
	console.log("re-render");
	const {
		data,
		isLoading = false,
		isError = false,
	} = useQuery({
		queryKey: ["books"],
		queryFn: getBooks,
	});
	const books = data?.data;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<LoaderCircle className="animate-spin h-10 w-10" />
				<span className="ml-2">Loading...</span>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex items-center justify-center text-red-500">
				<span>Error: Something went Wrong!!</span>
			</div>
		);
	}

	return (
		<div>
			<Link to={PATH_NAME.CREATE_BOOK} className="absolute right-4 top-4">
				<Button size="sm" className="h-8 gap-1">
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Add Product
					</span>
				</Button>
			</Link>
			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>Books</CardTitle>
					<CardDescription>
						Manage your Books and view their sales performance.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="hidden w-[100px] sm:table-cell">
									<span className="sr-only">Image</span>
								</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Genre</TableHead>
								<TableHead>Author Name</TableHead>
								<TableHead className="hidden md:table-cell">
									Created at
								</TableHead>
								<TableHead>
									<span className="sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{books?.map((book: Book) => {
								return (
									<TableRow key={book?._id}>
										<TableCell className="hidden sm:table-cell">
											<img
												alt="Product image"
												className="aspect-square rounded-md object-cover"
												height="64"
												src={book?.coverImage}
												width="64"
											/>
										</TableCell>
										<TableCell className="font-medium">{book?.title}</TableCell>
										<TableCell>
											<Badge variant="outline">{book?.genre}</Badge>
										</TableCell>
										<TableCell>{book?.author?.name}</TableCell>
										<TableCell className="hidden md:table-cell">
											{book?.createdAt}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						Showing <strong>1-10</strong> of <strong>32</strong> products
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default BookPage;
