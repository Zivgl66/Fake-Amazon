import { toast } from "react-toastify";

export function notify(message) {
  return toast.warn(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
