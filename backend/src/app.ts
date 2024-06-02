import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
import cors from "cors";

const apiUsers = `/api/users`;
const apiBooks = `/books`;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
	res.json({ message: "welcome to homepage" });
});

app.use(apiUsers, userRouter);
app.use(apiBooks, bookRouter);

// global error handler
app.use(globalErrorHandler);
export default app;
