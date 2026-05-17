import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { AuthInputProps } from "../../../utils/types";

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, hasError, errorMsg, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full flex flex-col gap-1 relative">
        <label className="text-sm font-semibold tracking-wide">{label}</label>

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-8.5 cursor-pointer z-10"
          >
            {showPassword ? (
              <EyeOff color="#fff" size={22} />
            ) : (
              <Eye color="#fff" size={22} />
            )}
          </button>
        )}

        <input
          ref={ref}
          {...props}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="input w-full hover:border-blue-400 focus:border-blue-400 focus:outline-0"
        />

        {hasError && (
          <p className="text-red-400 text-sm absolute top-16">{errorMsg}</p>
        )}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
