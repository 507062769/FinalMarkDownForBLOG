import { useState, useContext, useEffect } from "react";
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

export default function ButtonList(props: { pageid: string }) {
  const { isLogin } = useContext(UserContext);
  const [isShowComment, setIsShowComment] = useState<boolean>(false);
  const { data, refetch } = useQuery(
    ["commentdata"],
    async () => await get("/page/data", { pageid: props.pageid })
  );
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
          badge={{ count: data?.data?.linkCount, color: "blue" }}
        />
        <FloatButton
          icon={<FrownOutlined />}
          className="icon-button"
          tooltip={<span>踩</span>}
          badge={{ count: data?.data?.unlikeCount, color: "red" }}
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
