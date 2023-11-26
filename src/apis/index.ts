import axios from "axios";
import { message } from "antd";

const httpInstance = axios.create({
  baseURL: "http://localhost:9876",
  timeout: 5000,
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
    } else if (code === 200) {
      if (msg) message.success(msg);
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
