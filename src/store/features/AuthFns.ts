import axios from "axios";
import type { LoginUserTypes, RegisterUserTypes } from "../../utils/types";
import { endPoints } from "../apiEndPoints";
import { axiosInstance } from "../http";

export const loginUserAPIFn = async (payload: LoginUserTypes) => {
    try {
        const response = await axiosInstance.post(endPoints?.login, payload);
        return {
            data: response?.data,
            status: "success",
        };
    } catch (error) {
        const errorMsg = axios.isAxiosError(error) ? error.response?.data : error;
        return {
            data: null,
            status: "fail",
            error: errorMsg?.error?.message ?? "Something went wrong",
        };
    }
};

export const registerUserAPIFn = async (payload: RegisterUserTypes) => {
    try {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("email", payload.email);
        formData.append("password", payload.password);
        formData.append("status", payload.status);
        if (payload.picture) {
            formData.append("picture", payload.picture);
        }
        const response = await axiosInstance.post(endPoints?.register, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return {
            data: response?.data,
            status: "success"
        }

    } catch (error) {
        const errorMsg = axios.isAxiosError(error) ? error.response?.data : error
        console.log("🚀 ~ registerUserAPIFn ~ errorMsg:", errorMsg)
        return {
            data: null,
            status: "fail",
            error: errorMsg?.error?.message ?? "Something wents wrong"
        }
    }
}