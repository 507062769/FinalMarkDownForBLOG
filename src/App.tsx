// @ts-nocheck

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect, useLayoutEffect } from "react";
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
import AuthGuard from "./components/AuthGuard";
import OtherPersonalCenter from "./page/OtherPersonalCenter";
import HOCPageTitle from "./components/HOCPageTitle";
import NotFound from "./page/NotFound";
// import AI from "./page/Ai";
import MIndex from "./page/Mobile/Index";
import MHome from "./page/Mobile/Home";
import MOther from "./page/Mobile/Other";
import MSearch from "./page/Mobile/Search";
import { CurrentDeviceContext } from "./Context/CurrentDeviceProvide";
import MMdContent from "./page/Mobile/MdContent";
import { omit } from "./utils/miniLodash";

export default function App() {
  const { setIsLogin, setUserInfo } = useContext(UserContext);
  const { setIsPc, isPc } = useContext(CurrentDeviceContext);
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
          ...(omit(data, "isSuccess") as any),
          registerDays: moment().diff(Number(data.registerDate), "days"),
        });
      },
    }
  );
  useLayoutEffect(() => {
    // 在页面加载时检测设备类型并重定向
    window.addEventListener("load", () => {
      // 检测用户代理字符串
      const userAgent = navigator.userAgent;

      // 判断是否为移动设备
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );
      // 设置当前设备状态
      if (isMobile) {
        setIsPc(false);
      }
    });
    window.addEventListener(
      "orientationchange" in window ? "orientationchange" : "resize",
      (function () {
        function c() {
          if (isPc) return;
          const deviceWidth = 1920;
          const deviceHeight = 1080;
          const rem = 100;
          const clientWidth = document.documentElement.clientWidth;
          const clientHeight = document.documentElement.clientHeight;
          const base =
            clientWidth / clientHeight <= deviceWidth / deviceHeight
              ? clientWidth
              : clientHeight * (deviceWidth / deviceHeight);

          document.documentElement.style.fontSize =
            (base * rem) / deviceWidth + "px";
          window.onresize = function () {
            document.documentElement.style.fontSize =
              (base * rem) / deviceWidth + "px";
          };
        }
        c();
        return c;
      })(),
      false
    );
  }, []);
  useEffect(() => {
    if (location.pathname.includes("mobile")) {
      setIsPc(false);
    }
  }, [location.pathname]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>加载中</div>}>
              <Index />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <HOCPageTitle>
                  <Home />
                </HOCPageTitle>
              </Suspense>
            }
          />
          <Route
            path="page"
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <HOCPageTitle>
                  <PageComponent />
                </HOCPageTitle>
              </Suspense>
            }
          />
          <Route
            path="other"
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <HOCPageTitle>
                  <OtherPersonalCenter />
                </HOCPageTitle>
              </Suspense>
            }
          />
          <Route
            path="message"
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <AuthGuard>
                  <HOCPageTitle>
                    <Message />
                  </HOCPageTitle>
                </AuthGuard>
              </Suspense>
            }
          />
          <Route
            path="search"
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <HOCPageTitle>
                  <Search />
                </HOCPageTitle>
              </Suspense>
            }
          />
          <Route
            path="user"
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <AuthGuard>
                  <HOCPageTitle>
                    <UserControl />
                  </HOCPageTitle>
                </AuthGuard>
              </Suspense>
            }
          />
          <Route
            path="create"
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <AuthGuard>
                  <HOCPageTitle>
                    <Create />
                  </HOCPageTitle>
                </AuthGuard>
              </Suspense>
            }
          />
          {/* <Route path="ai" element={<AI />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="mobile"
          element={
            <Suspense fallback={<div>页面正在加载</div>}>
              <HOCPageTitle>
                <MIndex />
              </HOCPageTitle>
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <MHome />
              </Suspense>
            }
          />
          <Route path="other" element={<MOther />} />
          <Route
            path="search"
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <HOCPageTitle>
                  <Search />
                </HOCPageTitle>
              </Suspense>
            }
          />
          <Route
            path="page"
            element={
              <Suspense fallback={<div>页面正在加载</div>}>
                <HOCPageTitle>
                  <MMdContent />
                </HOCPageTitle>
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
