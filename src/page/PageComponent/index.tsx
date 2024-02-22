import MarkDownForCustom from "@/page/PageComponent/component/MarkDownForCustom";
import AuthUserInfo from "@/components/AuthUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { get } from "@/apis";
import { message } from "antd";
import { useEffect } from "react";

export default function PageComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const pageid = params.get("pageid") || "";
  const { data } = useQuery(
    ["pageData", pageid],
    async () => {
      return (await get("page/md", { pageId: pageid })) as any;
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
  useEffect(() => {
    setTimeout(() => {
      const codes = document.querySelectorAll(".code-box");
      codes.forEach((code: any) => {
        const codeType = code?.childNodes?.[0]?.classList?.[0] || "未知";
        const div = document.createElement("div");
        div.className = "code-copy-container";
        code.appendChild(div);

        const span = document.createElement("span");
        span.className = "code-type";
        span.textContent = codeType.replace("language-", "");
        div.appendChild(span);

        const button = document.createElement("span");
        button.textContent = "复制";
        button.className = "copy-button";
        // 将按钮添加到元素的右上角
        div.appendChild(button);
        // 添加点击事件，将元素内容复制到剪贴板上
        button.addEventListener("click", () => {
          const range = document.createRange();
          range.selectNode(code);
          window?.getSelection()?.removeAllRanges();
          window?.getSelection()?.addRange(range);
          document.execCommand("copy");
          window?.getSelection()?.removeAllRanges();
          message.success("成功复制到剪贴板");
        });
      });
    }, 500);
  }, []);

  return (
    <>
      <div className=" flex w-11/12 mx-auto">
        <div className=" w-10/12">
          <MarkDownForCustom data={data?.content || ""} pageid={pageid} />
        </div>
        <div className=" w-2/12">
          <AuthUserInfo userId={pageid.slice(0, -13)} />
        </div>
      </div>
    </>
  );
}
