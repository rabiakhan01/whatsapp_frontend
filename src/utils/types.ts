import React from "react";

// Register User Type
export interface RegisterUserTypes {
  fullName: string;
  email: string;
  status: string;
  password: string;
}

// Input Types
export type AuthInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    hasError?: boolean;
    errorMsg?: string;
  };