import express, { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import User from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
	// validation
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		const error = createHttpError(400, "All fields are required");
		return next(error);
	}

	// database call

	try {
		const user = await userModel.findOne({ email });
		if (user) {
			const error = createHttpError(400, "User already Exits with this mail");
			return next(error);
		}
	} catch (err) {
		return next(createHttpError(500, "Error while getting user"));
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	let newUser: User;
	try {
		newUser = await userModel.create({
			name,
			email,
			password: hashedPassword,
		});
		const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
			expiresIn: "7d",
		});
		res.json({ accessToken: token });
	} catch (err) {
		return next(
			createHttpError(500, "Unable to create new user while getting user")
		);
	}
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(createHttpError(400, "All fields required"));
	}

	const user = await userModel.findOne({ email });
	if (!user) {
		return next(createHttpError(404, "User not found"));
	}
	const isMatch = await bcrypt.compare(password, user?.password as string);
	if (!isMatch)
		return next(createHttpError(400, "Username or Password Incorrect"));

	const token = sign({ sub: user._id }, config.jwtSecret as string, {
		expiresIn: "7d",
		algorithm: "HS256",
	});

	return res.json({ accessToken: token });
};
export { createUser, loginUser };
