import express, { Router } from "express";
import bodyParser from "body-parser";
import {
    addUser,
    assignPoints,
    getAllUserDetails,
} from "../controllers/User/userController.ts";

const userRouter: Router = express.Router();

// Middleware
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

// API for adding user
userRouter.post("/addUser", addUser);

// API for assigning points
userRouter.post("/assignPoints", assignPoints);

// API for getting all user details
userRouter.get("/getAllUserDetails", getAllUserDetails);

export default userRouter;
