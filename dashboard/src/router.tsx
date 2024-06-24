import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookPage from "./pages/BookPage";
import CreateBook from "./pages/CreateBook";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardLayout />,
		children: [
			{ path: "", element: <Homepage /> },
			{ path: "dashboard/books", element: <BookPage /> },
			{ path: "dashboard/books/create", element: <CreateBook /> },
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{ path: "login", element: <Login /> },
			{ path: "signup", element: <Signup /> },
		],
	},
]);

export default router;
