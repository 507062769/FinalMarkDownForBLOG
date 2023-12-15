import { get } from "@/apis";
import { Tabs } from "antd";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import SearchUser from "./components/SearchUser";

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get("key") || "";
  const { data } = useQuery(
    ["queryKey", key],
    async () => get("/page/query", { key }),
    {
      retry: 3,
    }
  );
  return (
    <div
      className="w-11/12 mx-auto"
      style={{ minHeight: "calc(100vh - 154px)" }}
    >
      <Tabs
        className="bg-white px-4"
        style={{ minHeight: "calc(100vh - 154px)" }}
        items={[
          {
            label: `相关文章 (${data?.titleRes.length || 0})`,
            key: "pages",
            children: <SearchPage data={data?.titleRes || []} />,
          },
          {
            label: `相关用户 (${data?.userRes.length || 0})`,
            key: "users",
            children: <SearchUser data={data?.userRes || []} />,
          },
        ]}
      />
    </div>
  );
}
