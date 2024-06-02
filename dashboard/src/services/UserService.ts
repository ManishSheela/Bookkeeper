import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const apiUser = "api/users";

export const login = async (data: { email: string; password: string }) => {
	return api.post(`${apiUser}/login`, data);
};

export const register = async (data: {
	name: string;
	email: string;
	password: string;
}) => {
	return api.post(`${apiUser}/register`, data);
};
