import express, { Router } from "express";
import {
    addUser,
    assignPoints,
    getAllUserDetails,
} from "../controllers/User/userController";

const userRouter: Router = express.Router();

// API for adding user
userRouter.post("/addUser", addUser);

// API for assigning points
userRouter.post("/assignPoints", assignPoints);

// API for getting all user details
userRouter.get("/getAllUserDetails", getAllUserDetails);

export default userRouter;
