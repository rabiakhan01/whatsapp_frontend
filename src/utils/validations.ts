import * as Yup from "yup";

export const signupSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required").min(6, "The name should be between 6 to 12 character").max(12, "The name should be between 6 to 12 character"),
    email: Yup.string().required("Email is required").email("Invalid Email Address"),
    status: Yup.string().required("Status is required").max(64, "Status must be less than 64 characters"),
    password: Yup.string().required("Password is required").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, "Password must be atleast 6 characters, one special character, one number, one uppercase and one lowercase"),

})