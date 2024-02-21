import { get } from "@/apis";
import MdPreview from "@/components/MdPreview";
import ButtonList from "@/page/PageComponent/component/ButtonList";
import { message } from "antd";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

export default function MMdContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const pageid = params.get("pageid") || "";
  const { data } = useQuery(
    ["pageData", pageid],
    async () => {
      return get("page/md", { pageId: pageid }) as any;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        if (data?.isError) {
          message.error("当前不存在该文章");
          navigate("/error");
        }
      },
    }
  );
  return (
    <div className="relative">
      <div
        style={{ backgroundColor: "#f3f2ee", padding: "0 10px" }}
        id="write"
        className=".container-snow"
      >
        <MdPreview data={data?.content || ""} />
      </div>
      <ButtonList pageid={pageid} />
    </div>
  );
}
