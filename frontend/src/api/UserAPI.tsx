import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";
import type { IUser } from "../constant/types";

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

export const getAllUsersDetailsAPI = async (page: number, limit: number) => {
    try {
        let result = await axios(`${API_URL_BASE}/getAllUserDetails?page=${page}&limit=${limit}`, {
            method: "GET",
            withCredentials: true,
        });
        return result?.data;
    } catch (error) {
        return error;
    }
};