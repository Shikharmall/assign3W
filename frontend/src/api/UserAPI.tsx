import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";
import type { IUser, UserData } from "../constant/types";

// API for adding user

export const addUserAPI = async (data: IUser) => {
    try {
        let result = await axios(`${API_URL_BASE}/addUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                mode: "no-cors",
            },
            withCredentials: true,
            data: data,
        });
        return result;
    } catch (error) {
        return error;
    }
};

// API for assigning score

export const assignUserPointsAPI = async (userId: string) => {
    try {
        let result = await axios(
            `${API_URL_BASE}/assignPoints?userId=${userId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    mode: "no-cors",
                },
                withCredentials: true,
            }
        );
        return result;
    } catch (error) {
        return error;
    }
};

// API for getting all users details

export const getAllUsersDetailsAPI = async (page: number, limit: number): Promise<UserData> => {
    try {
        const result = await axios.get(`${API_URL_BASE}/getAllUserDetails`, {
            params: { page, limit },
            withCredentials: true,
        });

        return {
            status: result.status, // numeric HTTP status
            total: result.data?.total ?? 0,
            userTopThree: result.data?.userTopThree ?? [],
            data: result.data?.data ?? [],
        };
    } catch (error: any) {
        console.error("getAllUsersDetailsAPI error:", error);

        return {
            status: error?.response?.status ?? 500,
            total: 0,
            userTopThree: [],
            data: [],
        };
    }
};
