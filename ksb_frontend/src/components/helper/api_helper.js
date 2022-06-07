import { getEnvVariable } from "../../environment";

export const request = async (endpoint, method, body = false) => {
  const baseUrl = getEnvVariable().base_api_url;
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  return data;
};

export const getRequest = async (endpoint) => {
  return await request(endpoint, "GET");
};

export const postRequest = async (endpoint, data) => {
  return await request(endpoint, "POST", data);
};

export const putRequest = async (endpoint, data) => {
  return await request(endpoint, "PUT", data);
};

export const deleteRequest = async (endpoint, data) => {
  return await request(endpoint, "DELETE", data);
};
