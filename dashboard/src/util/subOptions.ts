import { Home, LibraryBig  } from "lucide-react";
import { PATH_NAME } from "./pathName";

export const subOptions = [
	{
		title: "Homepage",
		icon: Home,
		to: PATH_NAME.DASHBOARD,
	},
	{
		title: "Books",
		icon: LibraryBig,
		to: PATH_NAME.BOOKS,
	},
];
