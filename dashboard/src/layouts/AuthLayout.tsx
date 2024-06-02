import { PATH_NAME } from "@/util/pathName";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
	if (localStorage.getItem("accessToken"))
		return <Navigate to={PATH_NAME.DASHBOARD} replace />;
	return (
		<>
			<Outlet />
		</>
	);
};

export default AuthLayout;
