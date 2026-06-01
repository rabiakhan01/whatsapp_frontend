import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../utils/validations";
import AuthInput from "../AuthInput";
import { useAuthStore } from "../../../store/features/useAuthStore";
import { PulseLoader } from "react-spinners";
import type { LoginUserTypes } from "../../../utils/types";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const defaultValues: LoginUserTypes = {
    email: "",
    password: "",
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
    defaultValues,
  });
  const { loading, loginUser } = useAuthStore();

  const onSubmit = async (data: LoginUserTypes) => {
    const response = await loginUser({
      email: data.email,
      password: data.password,
    });
    if (response?.status === "success") {
      navigate("/");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-md space-y-8 px-10 py-6 rounded-xl bg-black/10 max-h-full overflow-auto">
        <div className="text-center text-blue-700">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm">Sign in to continue</p>
        </div>
        {/* Form */}
        <div className="w-full">
          <form
            className="mt-4 space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              {loading ? <PulseLoader color="#ffffff" size={16} /> : "Sign In"}
            </button>
            <div className="flex justify-center items-center text-md gap-1 mt-2 text-center text-blue-700 w-full">
              Don't have an account?{" "}
              <button
                className="underline cursor-pointer"
                type="button"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
