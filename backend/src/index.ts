import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 5174;

if (process.env.DATABASE === "MONGODB_ATLAS") {
  mongoose
    .connect(process.env.DATABASE_URL as string)
    .then(() => console.log("Connected to MongoDB Atlas."))
    .catch((err) => console.error("Connection Failed", err));
} else {
  console.log("No proper ENV.");
}

app.use(cookieParser());
app.use(express.json());

const allowedOrigins: string[] = ["http://localhost:5173"];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
