import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../../utils/validations";
import AuthInput from "../AuthInput";
import { useAuthStore } from "../../../store/features/useAuthStore";
import { PulseLoader } from "react-spinners";
import type { RegisterUserTypes } from "../../../utils/types";

const RegisterForm = () => {
  const defaultValues: RegisterUserTypes = {
    fullName: "",
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
  const { loading } = useAuthStore();
  const onSubmit = (data: RegisterUserTypes) => {
    console.log(data);
  };
  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-md space-y-8 px-10 py-6 rounded-xl bg-black/10 max-h-full overflow-auto">
        <div className="text-center text-blue-400">
          <h2 className="text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* Form */}
        <div className="w-full">
          <form
            className="mt-4 space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name={"fullName"}
              control={control}
              render={({ field }) => (
                <AuthInput
                {...field}
                  placeholder="Enter Full Name"
                  label="Full Name"
                  hasError={!!errors?.fullName}
                  errorMsg={errors?.fullName?.message}
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
                  label="Status"
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
            <div className="flex justify-center items-center text-md gap-1 mt-2 text-center text-blue-400 w-full">
              Already have an account? <button className="underline cursor-pointer">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
