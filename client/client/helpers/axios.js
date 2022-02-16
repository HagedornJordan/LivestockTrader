import axios from "axios";

const user =
  typeof window !== "undefined" ? localStorage.getItem("current_user") : "";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE.toString(),
  timeout: 5000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

export const sendRequest = async (url, method) => {
  const res = await axiosInstance.request({
    url: url,
    method: method,
    withCredentials: true
  });
  console.log(res);
  return res;
};

export default axiosInstance;
