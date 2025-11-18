import axiosClient from "./axiosClient.js";

export const getMyTasks = async () => {
  const { data } = await axiosClient.get("/tasks");
  return data;
};

export const markTaskFiled = async (id, payload) => {
  const { data } = await axiosClient.patch(`/tasks/${id}/mark-filed`, payload);
  return data;
};

export const getRiskSummary = async () => {
  const { data } = await axiosClient.get("/tasks/risk/summary");
  return data;
};
