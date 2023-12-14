import { get } from "@/apis";
import PageList from "@/components/PageList";
import { Empty } from "antd";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

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
      className="w-11/12 mx-auto flex flex-row justify-between"
      style={{ minHeight: "calc(100vh - 154px)" }}
    >
      <section className="w-8/12">
        <h2 className="search-title">相关文章</h2>
        <PageList data={data?.titleRes} />
        {data?.titleRes.length < 1 && (
          <Empty
            className="bg-white w-full m-0"
            style={{ height: "calc(100vh - 236px)" }}
          />
        )}
      </section>
      <section className="w-3/12">
        <h2 className="search-title">相关用户</h2>
        {data?.userRes.map((item) => {
          return (
            <div className="flex flex-row bg-white p-2 search-user-list">
              <img
                src={item.userImg}
                className="rounded-full w-16 h-16 flex-shrink-0"
              />
              <div className="ml-4">
                <p className="mt-0 text-base">{item.userName}</p>
                <span className="text-sm">{item.description}</span>
              </div>
            </div>
          );
        })}
        {data?.userRes.length < 1 && (
          <Empty
            className="bg-white w-full m-0"
            style={{ height: "calc(100vh - 236px)" }}
          />
        )}
      </section>
    </div>
  );
}
