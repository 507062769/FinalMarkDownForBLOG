import axios from "axios";
import { message } from "antd";
const BASE_URL = "http://localhost:9876";

const httpInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  // 将token发往后端
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    "X-Token": localStorage.getItem("BLOG_TOKEN") || "",
  },
});

httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    message.error("请求失败");
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (res) => {
    const { code, result, msg } = res.data;
    if (code === 301) {
      message.warning(msg);
    } else if (code === 200 && result.isShowMessage) {
      message.success(msg);
    }
    return result;
  },
  (error) => {
    message.error("网络错误");
    return Promise.reject(error);
  }
);

export type ClientError = {
  code: number;
  msg: string;
};

export const post = (url: string, data?: any) => {
  return httpInstance.post(url, data);
};

export const get = (url: string, data: any) => {
  return httpInstance.get(url, { params: data });
};

export const fetchFile = async (url: string, data: any, param?: any) => {
  const defaultConfig = {
    method: "POST",
    body: data,
    headers: {
      "X-Token": localStorage.getItem("BLOG_TOKEN") || "",
    },
    ...param,
  };
  try {
    const response = await fetch(BASE_URL + "/files" + url, defaultConfig);
    if (!response.ok) {
      throw new Error("请求失败");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("请求出错");
  }
};
