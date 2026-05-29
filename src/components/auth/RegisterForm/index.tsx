import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../../utils/validations";
import AuthInput from "../AuthInput";
import { useAuthStore } from "../../../store/features/useAuthStore";
import { PulseLoader } from "react-spinners";
import type { RegisterUserTypes } from "../../../utils/types";
import { showToast } from "../../../utils/utilityFns";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cloud_secret = import.meta.env.VITE_API_CLOUD_SECRET;
const cloud_name = import.meta.env.VITE_API_CLOUD_NAME;

const RegisterForm = () => {
  const defaultValues: RegisterUserTypes = {
    name: "",
    email: "",
    status: "",
    password: "",
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(signupSchema),
    defaultValues: defaultValues,
  });
  const navigate = useNavigate();
  const [picture, setPicture] = useState<File | null>(null);
  const [readablePic, setReadablePic] = useState("");
  const { loading, registerUser } = useAuthStore();

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showToast("Only JPEG, PNG, and WebP images are allowed", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image must be smaller than 5MB", "error");
      return;
    }

    setPicture(file);
    const reader = new FileReader();
    reader.onload = (ev) => setReadablePic(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: RegisterUserTypes) => {
    const payload: RegisterUserTypes = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      status: data?.status,
    };
    if (readablePic) {
      await uploadImage().then(async (data) => {
        await registerUser({ ...payload, picture: data.secure_url });
        navigate("/login");
      });
    } else {
      await registerUser(payload);
      navigate("/login");
    }
  };
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData,
    );
    return data;
  };
  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-md space-y-8 px-10 py-6 rounded-xl bg-black/10 max-h-full overflow-auto">
        <div className="text-center text-blue-700">
          <h2 className="text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* Profile Picture Upload */}
        <div className="flex justify-center">
          <div
            className="relative cursor-pointer"
            onClick={() => document.getElementById("picture-input")?.click()}
          >
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-2 border-blue-700">
              {readablePic ? (
                <img
                  src={readablePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-700 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm7.2-10.4h-2.16l-1.44-1.6H8.4L6.96 4.8H4.8A2.4 2.4 0 0 0 2.4 7.2v12a2.4 2.4 0 0 0 2.4 2.4h14.4a2.4 2.4 0 0 0 2.4-2.4v-12a2.4 2.4 0 0 0-2.4-2.4z" />
              </svg>
            </div>
          </div>
          <input
            id="picture-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handlePictureChange}
          />
        </div>
        {/* Form */}
        <div className="w-full">
          <form
            className="mt-4 space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name={"name"}
              control={control}
              render={({ field }) => (
                <AuthInput
                  {...field}
                  placeholder="Enter Full Name"
                  label="Full Name"
                  hasError={!!errors?.name}
                  errorMsg={errors?.name?.message}
                />
              )}
            />
            <Controller
              name={"email"}
              control={control}
              render={({ field }) => (
                <AuthInput
                  {...field}
                  placeholder="Enter Email"
                  label="Email"
                  hasError={!!errors?.email}
                  errorMsg={errors?.email?.message}
                />
              )}
            />
            <Controller
              name={"status"}
              control={control}
              render={({ field }) => (
                <AuthInput
                  {...field}
                  placeholder="Enter Status"
                  label="Status (Optional)"
                  hasError={!!errors?.status}
                  errorMsg={errors?.status?.message}
                />
              )}
            />
            <Controller
              name={"password"}
              control={control}
              render={({ field }) => (
                <AuthInput
                  {...field}
                  placeholder="Enter Password"
                  label="Password"
                  type="password"
                  hasError={!!errors?.password}
                  errorMsg={errors?.password?.message}
                />
              )}
            />
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary bg-blue-700 w-full mt-6"
            >
              {loading ? <PulseLoader color="#ffffff" size={16} /> : "Sign Up"}
            </button>
            <div className="flex justify-center items-center text-md gap-1 mt-2 text-center text-blue-700 w-full">
              Already have an account?{" "}
              <button
                className="underline cursor-pointer"
                type="button"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
