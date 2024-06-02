import path from "node:path";
import cloudinary from "../config/cloudinary";
import fs from "node:fs";

const cloudinaryFolderName = {
	BOOK_COVER: "book-covers",
	BOOK_PDF: "book-pdfs",
};

export const cloudinaryUpload = async (
	resourceType: any,
	filePath: string,
	fileName: string,
	folderName: string,
	fileFormat: string
) => {
	const options = {
		resource_type: resourceType,
		filename_override: fileName,
		folder: folderName,
		fileFormat: fileFormat,
	};

	try {
		const data = await cloudinary.uploader.upload(filePath, options);
		return data?.secure_url;
	} catch (err) {
		console.log("Error Occure", err);
	}
};

export const fileManipulationForCloudinaryUpload = async ({
	file,
	type = "image",
}: {
	file: any;
	type: string;
}) => {
	if (!file) {
		throw new Error(`Please upload ${type}.`);
	}

	const { filename, mimetype } = file;
	const fileFormat = mimetype?.split("/")[1];
	const filePath = path.resolve(
		__dirname,
		"../../public/data/uploads",
		filename
	);
	const folderName =
		type === "image"
			? cloudinaryFolderName?.BOOK_COVER
			: cloudinaryFolderName?.BOOK_PDF;

	const fileSecureURL = await cloudinaryUpload(
		type,
		filePath,
		filename,
		folderName,
		fileFormat
	);
	await fs.promises.unlink(filePath); // delete from local
	return fileSecureURL;
};

export const updateFileOnCloudinary = async ({
	file,
	type,
}: {
	file: any;
	type: string;
}) => {
	const secureURL = await fileManipulationForCloudinaryUpload({
		file: file,
		type,
	});
	const deleteFile = await deleteFileFromCloudinary(file?.coverImage, type);
	return secureURL;
};
export const deleteFileFromCloudinary = async (
	file: string,
	type = "image"
) => {
	const splitFiles = file?.split("/");
	const folderName = splitFiles?.at(-2);
	const filePublicId = `${folderName}/${
		type === "image"
			? splitFiles?.at(-1)?.split(".").at(-2)
			: splitFiles?.at(-1)
	}`;

	const result = await cloudinary.uploader.destroy(
		filePublicId,
		{ resource_type: type },
		(error, result) => {
			if (error) {
				return false;
			} else if (result.result === "ok") {
				return true;
			} else return false;
		}
	);
	return result;
};
