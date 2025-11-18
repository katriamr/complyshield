import axiosClient from "./axiosClient.js";

export const getNotifications = async () => {
  const { data } = await axiosClient.get("/notifications");
  return data;
};

export const markNotificationRead = async (id) => {
  const { data } = await axiosClient.patch(`/notifications/${id}/read`);
  return data;
};
