import { Tabs } from "antd";
import UserInfo from "./Component/UserInfo";
import UserPage from "./Component/UserPage";

export default function UserControl() {
  return (
    <div
      style={{ height: "calc(100vh - 154px)" }}
      className=" w-11/12 mx-auto bg-white overflow-y-scroll"
    >
      <Tabs
        className="px-5"
        items={[
          { label: "个人资料", key: "control", children: <UserInfo /> },
          { label: "我的创作", key: "page", children: <UserPage /> },
          {
            label: "待发布",
            key: "check",
            children: <UserPage isCheck={true} />,
          },
        ]}
      />
    </div>
  );
}
