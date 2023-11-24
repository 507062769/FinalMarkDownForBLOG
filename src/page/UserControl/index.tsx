import { Tabs } from "antd";
import UserInfo from "./Component/UserInfo";
import UserPage from "./Component/UserPage";
import UserSecure from "./Component/UserSecure";

export default function UserControl() {
  return (
    <div
      style={{ height: "calc(100vh - 154px)" }}
      className=" w-11/12 mx-auto bg-white"
    >
      <Tabs
        className="px-5"
        items={[
          { label: "个人资料", key: "control", children: <UserInfo /> },
          { label: "我的创作", key: "page", children: <UserPage /> },
          { label: "账号安全", key: "secure", children: <UserSecure /> },
        ]}
      />
    </div>
  );
}
