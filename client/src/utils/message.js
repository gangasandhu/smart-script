import { toast } from "react-toastify";

// message after successfully compiling the code
export const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

// message for error in compilation
export const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
        position: "top-right",
        autoClose: timer ? timer : 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};