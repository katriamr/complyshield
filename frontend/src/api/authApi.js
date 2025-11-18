import axiosClient from "./axiosClient.js";

export const loginApi = async (payload) => {
  const { data } = await axiosClient.post("/auth/login", payload);
  return data;
};

export const registerApi = async (payload) => {
  const { data } = await axiosClient.post("/auth/register", payload);
  return data;
};

export const getMe = async () => {
  const { data } = await axiosClient.get("/auth/me");
  return data;
};
