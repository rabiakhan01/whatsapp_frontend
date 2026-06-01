import React from "react";

// Register User Type
export interface RegisterUserTypes {
  name: string;
  email: string;
  status: string;
  password: string;
  picture?: File | null;
}

// Login User Type
export interface LoginUserTypes {
  email: string;
  password: string;
}

// Input Types
export type AuthInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    hasError?: boolean;
    errorMsg?: string;
  };