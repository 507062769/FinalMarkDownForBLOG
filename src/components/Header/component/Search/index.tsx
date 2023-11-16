import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

export default function Search() {
  const { Search } = Input;
  const onSearch = (value: string) => {
    console.log(value);
  };
  return (
    <Search
      placeholder="input search text"
      allowClear
      enterButton={"搜索"}
      size="large"
      onSearch={onSearch}
      suffix={<SearchOutlined />}
    />
  );
}
