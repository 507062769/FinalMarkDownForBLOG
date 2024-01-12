import { TabContextProvide } from "@/Context/TabContextProvide";
// import Search from "./component/Search";
import UserInfo from "./component/UserInfo";
import "./index.less";
import { SearchOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { Search } = Input;
  const navigate = useNavigate();
  const [key, setKey] = useState<string>("");
  const onSearch = (value: string) => {
    if (!value) {
      message.warning("当前搜索框为空");
      return;
    }
    navigate(`/search?key=${value}`);
    setKey("");
  };
  return (
    <header
      id="MyHeader"
      className="mb-7 z-50 sticky top-0"
      style={{
        height: "64px",
        border: "1px solid white",
        boxShadow: "0 0 20px 4px rgba(0, 0, 0, 0.3)",
        background: "transparent",
        backdropFilter: "blur(10px)",
        transition: "all .3s liner",
      }}
    >
      <div className="flex w-11/12 justify-between mx-auto">
        <Link to={"/"}>
          <h1 className="w-1/5 m-0 ">
            <a id="Logo" title="首页">
              首页
            </a>
          </h1>
        </Link>
        <div className="w-2/5 pt-3">
          <Search
            placeholder="输入搜索内容"
            allowClear
            enterButton={"搜索"}
            size="large"
            onSearch={onSearch}
            suffix={<SearchOutlined />}
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <div className="w-3/12">
          <TabContextProvide>
            <UserInfo />
          </TabContextProvide>
        </div>
      </div>
    </header>
  );
}
