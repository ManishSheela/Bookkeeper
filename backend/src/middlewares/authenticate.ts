import { verify } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { config } from "../config/config";
import { AuthRequest } from "../utils/constant";

const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("Authorization");
	if (!token) {
		return next(createHttpError(401, "Authorization token is required"));
	}
	const parsedToken = token.split(" ")[1];
	const decoded = verify(parsedToken, config.jwtSecret as string);
	const _req = req as unknown as AuthRequest;
	_req.userId = decoded?.sub as string;
	console.log("decoded", decoded);
	next();
};

export default authenticate;
