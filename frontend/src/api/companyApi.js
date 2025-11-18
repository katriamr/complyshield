import axiosClient from "./axiosClient.js";

export const upsertCompany = async (payload) => {
  const { data } = await axiosClient.post("/company", payload);
  return data;
};

export const getMyCompany = async () => {
  const { data } = await axiosClient.get("/company/me");
  return data;
};

export const generateTasks = async () => {
  const { data } = await axiosClient.post("/company/generate-tasks");
  return data;
};
