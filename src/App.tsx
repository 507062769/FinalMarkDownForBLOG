import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route
            index
            element={
              // 可以利用传入HOC一个字段，然后写一个函数，在函数对参数进行处理，从而达到自定义标题的效果
              <HOCPageTitle title="Z的博客社区">
                <Home />
              </HOCPageTitle>
            }
          />
          <Route
            path="page"
            element={
              <HOCPageTitle title="文章">
                <PageComponent />
              </HOCPageTitle>
            }
          />
          <Route
            path="other"
            element={
              <HOCPageTitle title="他的主页">
                <OtherPersonalCenter />
              </HOCPageTitle>
            }
          />
          <Route
            path="message"
            element={
              <AuthGuard>
                <HOCPageTitle title="私信">
                  <Message />
                </HOCPageTitle>
              </AuthGuard>
            }
          />
          <Route
            path="search"
            element={
              <HOCPageTitle title="搜索结果">
                <Search />
              </HOCPageTitle>
            }
          />
          <Route
            path="user"
            element={
              <AuthGuard>
                <HOCPageTitle title="个人中心">
                  <UserControl />
                </HOCPageTitle>
              </AuthGuard>
            }
          />
          <Route
            path="create"
            element={
              <AuthGuard>
                <HOCPageTitle title="创建新文章">
                  <Create />
                </HOCPageTitle>
              </AuthGuard>
            }
          />
          <Route
            path="*"
            element={
              <HOCPageTitle title="页面不见啦">
                <div>404</div>
              </HOCPageTitle>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
