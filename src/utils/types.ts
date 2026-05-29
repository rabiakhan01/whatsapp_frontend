import React from "react";

// Register User Type
export interface RegisterUserTypes {
  name: string;
  email: string;
  status: string;
  password: string;
  picture?: File | null;
}

// Input Types
export type AuthInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    hasError?: boolean;
    errorMsg?: string;
  };