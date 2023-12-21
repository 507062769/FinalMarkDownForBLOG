import { useState, useContext } from "react";
import {
  CommentOutlined,
  FrownOutlined,
  SmileOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { FloatButton, message } from "antd";
import "./index.less";
import Comment from "../Comment";
import { useQuery } from "react-query";
import { get } from "@/apis";
import { UserContext } from "@/Context/UserContextProvide";
import { fetchOperator } from "@/apis/pages";
import { useLocation } from "react-router-dom";

export default function ButtonList(props: { pageid: string }) {
  const { isLogin, userInfo } = useContext(UserContext);
  const [isShowComment, setIsShowComment] = useState<boolean>(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageid = params.get("pageid") || "";
  const { data, refetch } = useQuery(
    ["commentdata"],
    async () => await get("/page/data", { pageid: props.pageid })
  );
  const { mutateAsync: operator } = fetchOperator();
  const handleOperator = async (type: string) => {
    const lastClick = JSON.parse(localStorage.getItem("LAST_CLICK")!);

    if ((+new Date() - lastClick) / 1000 > 60) {
      await operator({
        type,
        pageid,
        fromQQ: userInfo.qq || "unlogin",
        targetQQ: pageid.slice(0, -13),
      });
      await refetch();
      localStorage.setItem("LAST_CLICK", JSON.stringify(+new Date()));
    } else {
      message.warning("1分钟内仅可点赞/踩一次");
    }
  };
  return (
    <>
      <FloatButton.Group
        className=" flex flex-col items-start"
        style={{ right: "15%" }}
        type="primary"
      >
        <FloatButton
          icon={<CommentOutlined />}
          className="icon-button"
          tooltip={<span>评论</span>}
          badge={{ count: data?.data?.commnetCount, color: "#282c34" }}
          onClick={() => {
            if (!isLogin) {
              message.warning("当前未登录");
            }
            setIsShowComment(true);
          }}
        />
        <FloatButton
          icon={<SmileOutlined />}
          className="icon-button"
          tooltip={<span>顶</span>}
          badge={{ count: data?.data?.likeCount, color: "blue" }}
          onClick={() => handleOperator("top")}
        />
        <FloatButton
          icon={<FrownOutlined />}
          className="icon-button"
          tooltip={<span>踩</span>}
          badge={{ count: data?.data?.unlikeCount, color: "red" }}
          onClick={() => handleOperator("bottom")}
        />
        <FloatButton.BackTop
          icon={<VerticalAlignTopOutlined />}
          visibilityHeight={400}
          target={() => document.querySelector(".container-snow") as any}
          className="icon-button"
          tooltip={<span>回到顶部</span>}
        />
      </FloatButton.Group>
      <Comment
        isShowComment={isShowComment}
        setIsShowComment={setIsShowComment}
        refetch={refetch}
      />
    </>
  );
}
