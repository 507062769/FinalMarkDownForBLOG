import {
  CommentOutlined,
  FrownOutlined,
  SmileOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { Drawer, FloatButton } from "antd";
import { animateScroll } from "react-scroll";
import "./index.less";

export default function ButtonList() {
  return (
    <>
      <FloatButton.Group
        className=" flex flex-col items-start"
        style={{ right: "15%" }}
        type="primary"
      >
        <FloatButton.BackTop
          icon={<VerticalAlignTopOutlined />}
          onClick={() => animateScroll.scrollToTop({ duration: "1000" })}
          className="icon-button"
          tooltip={<span>回到顶部</span>}
        />
        <FloatButton
          icon={<CommentOutlined />}
          className="icon-button"
          tooltip={<span>评论</span>}
          badge={{ count: 5, color: "#282c34" }}
        />
        <FloatButton
          icon={<SmileOutlined />}
          className="icon-button"
          tooltip={<span>顶</span>}
          badge={{ count: 5, color: "blue" }}
        />
        <FloatButton
          icon={<FrownOutlined />}
          className="icon-button"
          tooltip={<span>踩</span>}
          badge={{ count: 5, color: "red" }}
        />
      </FloatButton.Group>
    </>
  );
}
