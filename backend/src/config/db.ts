import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
	try {
		mongoose.connection.on("connected", () => {
			console.log("Connected to database successfully");
		});
		mongoose.connection.on("error", () => {
			console.log("Error in connection to database");
		});
		await mongoose.connect(config.databaseURL as string, { dbName: "elib" });
	} catch (err) {
		console.error("failed to connect to database", err);
		process.exit(1);
	}
};

export default connectDB;
