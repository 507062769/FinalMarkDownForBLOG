import { Tabs } from "antd";
import UploadMd from "./components/UploadMd";

export default function Create() {
  return (
    <div
      style={{ height: "calc(100vh - 154px)" }}
      className=" w-11/12 mx-auto bg-white overflow-y-scroll"
    >
      <Tabs
        className="p-4"
        items={[{ label: "文档上传", key: "md", children: <UploadMd /> }]}
      />
    </div>
  );
}
