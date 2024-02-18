import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import Home from "./page/Home";
import Index from "@/page/Index";
import PageComponent from "./page/PageComponent";
import Message from "./page/Message";
import Search from "./page/Search";
import UserControl from "./page/UserControl";
import Create from "./page/Create";
import { useQuery } from "react-query";
import { post } from "./apis";
import { UserContext } from "./Context/UserContextProvide";
import moment from "moment";
import _ from "lodash";
import AuthGuard from "./components/AuthGuard";
import OtherPersonalCenter from "./page/OtherPersonalCenter";
import HOCPageTitle from "./components/HOCPageTitle";
import NotFound from "./page/NotFound";
import AI from "./page/Ai";

export default function App() {
  const { setIsLogin, setUserInfo } = useContext(UserContext);
  useQuery(
    ["token"],
    async () =>
      await post("/users/token", { token: localStorage.getItem("BLOG_TOKEN") }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (data: any) => {
        setIsLogin(data?.isSuccess);
        setUserInfo({
          ...(_.omit(data, "isSuccess") as any),
          registerDays: moment().diff(Number(data.registerDate), "days"),
        });
      },
    }
  );
  useEffect(() => {
    // 在页面加载时检测设备类型并重定向
    window.addEventListener("load", () => {
      // 检测用户代理字符串
      const userAgent = navigator.userAgent;

      // 判断是否为移动设备
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );

      // 重定向到不同网站
      if (isMobile) {
        window.location.href = "https://m.zhangtc.online";
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route
            index
            element={
              // 可以利用传入HOC一个字段，然后写一个函数，在函数对参数进行处理，从而达到自定义标题的效果
              <HOCPageTitle>
                <Home />
              </HOCPageTitle>
            }
          />
          <Route
            path="page"
            element={
              <HOCPageTitle>
                <PageComponent />
              </HOCPageTitle>
            }
          />
          <Route
            path="other"
            element={
              <HOCPageTitle>
                <OtherPersonalCenter />
              </HOCPageTitle>
            }
          />
          <Route
            path="message"
            element={
              <AuthGuard>
                <HOCPageTitle>
                  <Message />
                </HOCPageTitle>
              </AuthGuard>
            }
          />
          <Route
            path="search"
            element={
              <HOCPageTitle>
                <Search />
              </HOCPageTitle>
            }
          />
          <Route
            path="user"
            element={
              <AuthGuard>
                <HOCPageTitle>
                  <UserControl />
                </HOCPageTitle>
              </AuthGuard>
            }
          />
          <Route
            path="create"
            element={
              <AuthGuard>
                <HOCPageTitle>
                  <Create />
                </HOCPageTitle>
              </AuthGuard>
            }
          />
          {/* <Route path="ai" element={<AI />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
