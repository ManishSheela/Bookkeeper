import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add a request interceptor to include the access token in the headers
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

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

export const getBooks = async () => {
	return api.get(`/books`);
};

export const createBook = async (data: FormData) => {
	return api.post("/books/addBook", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
