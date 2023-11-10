import imgUser from "@/assets/imgUser.jpg";
import { Space } from "antd";

export default function CommentBody() {
  const data = [
    {
      userName: "一个用户一个用户一个用户",
      createTime: "2023-12-01",
      content: "写的很好",
    },
    {
      userName: "一个用一个用户",
      createTime: "2023-12-01",
      content: "写的很好",
    },
    {
      userName: "一",
      createTime: "2023-12-01",
      content: "写的很好",
    },
    {
      userName: "一个用户一个用户一个用户",
      createTime: "2023-12-01",
      content: "写的很好",
    },
  ];
  return (
    <div id="CommentBody" className="box-border pl-10">
      {data.map((item) => {
        return (
          <div className="my-6">
            <Space className="w-full" size="large">
              <img
                src={imgUser}
                alt="头像"
                className="w-8 h-8 rounded"
                style={{ verticalAlign: "text-top" }}
              />
              <a href="javascript:0;" className=" text-lg">
                {item?.userName}
              </a>
              <span>{item?.createTime}</span>
            </Space>
            <p>{item?.content}</p>
          </div>
        );
      })}
    </div>
  );
}
