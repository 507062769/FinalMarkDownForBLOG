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

export default function App() {
  const { setIsLogin } = useContext(UserContext);
  useQuery(
    ["token"],
    async () =>
      await post("/user/token", { token: localStorage.getItem("BLOG_TOKEN") }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (data: any) => {
        setIsLogin(data?.isSuccess);
      },
    }
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="page" element={<PageComponent />} />
          <Route path="message" element={<Message />} />
          <Route path="search" element={<Search />} />
          <Route path="user" element={<UserControl />} />
          <Route path="create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
