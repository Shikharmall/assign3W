import generatePoints from "../../utils/generatePoints";
import type { Request, Response } from "express";
import User from "../../models/User/userModel";
import type { IUser } from "../../constant/types.ts";

//adding the user

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    // Find name if empty

    if (!name || name.trim().length === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Name is required." });
    }

    const userData = new User({
      name: name,
    });

    const userDataSaved = await userData.save();

    if (userDataSaved) {
      return res.status(201).json({ status: "success", userId: userDataSaved?._id });
    }
  } catch (error: any) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//assigning points the user

export const assignPoints = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res
        .status(400)
        .json({ status: "failed", message: "User ID is required." });
    }

    const userExist = await User.findById(userId);

    if (!userExist) {
      return res
        .status(404)
        .json({ status: "failed", message: "User does not exist." });
    }

    const randomPoint: number = generatePoints();

    userExist?.points?.push(randomPoint);

    const updatedUser = await userExist.save();

    return res.status(200).json({
      status: "success",
      userId: updatedUser._id,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "failed", message: error.message });
  }
};

//get all user details

export const getAllUserDetails = async (req: Request, res: Response) => {
  try {

    const page: number = parseInt(req.query.page as string) || 1;
    let limit: number = parseInt(req.query.limit as string) || 10;
    let skip: number = 0;

    if (page === 1) {
      skip = (page - 1) * limit + 3;
      limit = 7;
    } else {
      skip = (page - 1) * limit;
    }

    // Top three users (highest first)
    const userTopThreeData: IUser[] = await User.aggregate([
      {
        $addFields: {
          totalPoints: { $sum: "$points" }
        }
      },
      {
        $sort: { totalPoints: -1 }
      },
      {
        $limit: 3
      },
    ]);

    //Total users
    const userTotalData: number = (await User.find()).length;

    // Sort by points in descending order (highest first)
    const userData: IUser[] = await User.aggregate([
      {
        $addFields: {
          totalPoints: { $sum: "$points" }
        }
      },
      {
        $sort: { totalPoints: -1 }
      },
      {
        $skip: skip
      },
      {
        $limit: limit || 10
      },
    ]);

    return res.status(200).json({ status: "success", data: userData, total: userTotalData, userTopThree: userTopThreeData });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "failed", message: error.message });
  }
};