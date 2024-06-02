import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardLayout />,
		children: [{ path: "/dashboard", element: <Homepage /> }],
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
