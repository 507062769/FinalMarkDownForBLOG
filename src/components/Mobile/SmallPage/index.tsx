import { Page } from "@/page/UserControl/Component/UserPage";
import { EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Space } from "antd";
import moment from "moment";

interface SmallPageProps {
  index: number;
  item: Page;
}

export default function SmallPage({ item, index }: SmallPageProps) {
  return (
    <div
      key={item.coverUrl}
      className={`flex flex-row justify-between
            `}
      style={{
        borderBottom: "1px solid #ccc",
        borderTop: `1px solid ${index === 0 ? "#ccc" : "transparent"}`,
      }}
    >
      <img
        style={{
          width: "40%",
          height: "100px",
          transform: "scale(.7)",
          border: "1px solid #ccc",
        }}
        src={item.coverUrl}
        title={item.title}
        alt={item.description}
      />
      <div
        style={{ width: "55%" }}
        className="pr-2 box-border flex flex-col justify-between"
      >
        <h4
          className="mb-1"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </h4>
        <span className="mb-2 flex flex-row justify-between">
          {moment(Number(item.createTime)).format("YYYY-MM-DD")}
          <Space className="pr-2">
            <span>
              <EyeOutlined />
              &nbsp;
              {item.viewCount}
            </span>
            <span>
              <LikeOutlined />
              &nbsp;
              {item.likeCount}
            </span>
          </Space>
        </span>
      </div>
    </div>
  );
}
