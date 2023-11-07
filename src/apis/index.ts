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
    return res.data.result;
  },
  (error) => {
    message.error("响应失败");
    return Promise.reject(error);
  }
);

export default httpInstance;
