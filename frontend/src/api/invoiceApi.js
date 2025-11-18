import axiosClient from "./axiosClient.js";

export const uploadInvoice = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosClient.post("/invoices/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getInvoices = async () => {
  const { data } = await axiosClient.get("/invoices");
  return data;
};
