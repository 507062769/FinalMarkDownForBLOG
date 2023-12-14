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
          <Route index element={<Home />} />
          <Route path="page" element={<PageComponent />} />
          <Route path="other" element={<OtherPersonalCenter />} />
          <Route
            path="message"
            element={
              <AuthGuard>
                <Message />
              </AuthGuard>
            }
          />
          <Route path="search" element={<Search />} />
          <Route
            path="user"
            element={
              <AuthGuard>
                <UserControl />
              </AuthGuard>
            }
          />
          <Route
            path="create"
            element={
              <AuthGuard>
                <Create />
              </AuthGuard>
            }
          />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
