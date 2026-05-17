import { axiosInstance } from "../http"
import type { RegisterUserTypes } from "../../utils/types";
import { endPoints } from "../apiEndPoints";

export const loginUserFn = async (payload: RegisterUserTypes) => {
    const response = await axiosInstance.post(endPoints?.register, { ...payload });
    if (response?.status) {
        return {
            data: response?.data,
            status: "success"
        }
    } else {
        return {
            data: null,
            status: "fail",
            error: response?.data?.error ?? "Something wents wrong"
        }
    }
}