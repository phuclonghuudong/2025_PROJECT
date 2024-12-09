import axiosClient from "./axiosClient";

const handleAPI = async (
  url,
  method = "POST" | "PUT" | "GET" | "DELETE",
  data
) => {
  return await axiosClient(url, { method: method ?? "GET", data });
};
export default handleAPI;
