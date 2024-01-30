import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const titleCustom = {
  user: "个人中心",
  create: "创建BLOG",
  page: "",
  other: "的主页",
  message: "私信",
  home: "Z的博客社区",
  key: "的搜索结果",
};

export default function HOCPageTitle(props: any) {
  const location = useLocation();
  const [title, setTitle] = useState<string>("");
  const params = new URLSearchParams(location.search);
  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Z的博客社区");
    } else {
      let key = location.pathname.replace("/", "");
      key === "search" ? (key = "key") : null;
      const str =
        titleCustom[
          key as
            | "user"
            | "create"
            | "page"
            | "other"
            | "other"
            | "message"
            | "home"
            | "key"
        ];
      const customStr = params.get(key) || "";
      setTitle(customStr + str);
    }
  }, [location.pathname, location.search]);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {props?.children}
    </>
  );
}
