import MarkDownForCustom from "@/page/PageComponent/component/MarkDownForCustom";
import AuthUserInfo from "@/components/AuthUserInfo";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { get } from "@/apis";

export default function PageComponent() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageid = params.get("pageid") || "";
  const { data } = useQuery(
    ["pageData", pageid],
    async () => {
      return (await get("page/md", { pageId: pageid })) as any;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div
        className=" flex w-11/12 mx-auto"
        style={{ height: "calc(100vh - 154px)" }}
      >
        <div className=" w-10/12">
          <MarkDownForCustom data={data?.content || ""} />
        </div>
        <div className=" w-2/12">
          <AuthUserInfo userId={1} />
        </div>
      </div>
    </>
  );
}
