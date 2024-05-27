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
  console.log('卷毛sb',)
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
