import { config as conf } from "dotenv";

conf();
const _config = {
	port: process.env.PORT,
	databaseURL: process.env.MONGO_CONNECTION_STRING,
	env: process.env.NODE_ENV,
	jwtSecret: process.env.JWT_SECRET,
	cloudName: process.env.CLOUDINARY_CLOUD_NAME,
	cloudApiKey: process.env.CLOUDINARY_API_KEY,
	cloudApiSecret: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
