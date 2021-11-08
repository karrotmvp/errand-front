import envs from "@config/dotenv";
import axios, { AxiosRequestConfig } from "axios";

type ResponseType = {
  data: any;
  message?: string;
  status: string;
  statusCode: number;
};

const fetchWrap = async ({
  method,
  url,
  params,
  body,
}: {
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  params?: {};
  body?: {};
}): Promise<ResponseType> => {
  try {
    const config: AxiosRequestConfig = {
      baseURL: envs.API_BASE_URL,
      withCredentials: true,
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const { data } =
      (method === "get" && (await axios.get(url, config))) ||
      (method === "post" && (await axios.post(url, body, config))) ||
      (method === "put" && (await axios.put(url, body, config))) ||
      (method === "delete" && (await axios.delete(url, config))) ||
      (method === "patch" && (await axios.patch(url, body, config))) ||
      {};
    return data;
  } catch (error) {
    console.log("에러 터짐요~~");
    throw new Error("에러다요");
    // localStorage.removeItem("token");
    // window.location.href = "/401";
  }
};
export const GET = (url: string, params?: {}) =>
  fetchWrap({ method: "get", url, params });

export const POST = (url: string, body?: {}, params?: {}) =>
  fetchWrap({ method: "post", url, body, params });

export const PUT = (url: string, body?: {}) =>
  fetchWrap({ method: "put", url, body });

export const DELETE = (url: string) => fetchWrap({ method: "delete", url });

export const PATCH = (url: string, body?: {}) =>
  fetchWrap({ method: "patch", url, body });
