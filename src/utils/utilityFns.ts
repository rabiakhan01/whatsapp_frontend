import { Slide, toast, type ToastOptions } from "react-toastify";

type toastTypes = 'error' | 'success' | 'warning' | 'info';
export const showToast = (message: string, type: toastTypes = "info", options: ToastOptions = {}) => {
    const initialOptions = {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide,
        pauseOnFocusLoss: false,
    };
    const defaultOptions: ToastOptions = {
        ...initialOptions,
        position: "top-right",
        autoClose: 3000,
    };

    const config: ToastOptions = { ...defaultOptions, ...options };

    switch (type) {
        case "success":
            toast.success(message, config);
            break;

        case "error":
            toast.error(message, config);
            break;

        case "warning":
            toast.warning(message, config);
            break;

        case "info":
        default:
            toast.info(message, config);
            break;
    }
};

