import imgUser from "@/assets/imgUser.jpg";
import { Space } from "antd";

export default function CommentBody() {
  const data = [
    {
      userName: "一个用户一个用户一个用户",
      createTime: "2023-12-01",
      content: "写的很好",
      children: [
        {
          usernameOne: "ZZZZZZ",
          usernameTwo: "",
          text: "你说的很好",
          createTime: "2023-12-31",
        },
        {
          usernameOne: "TTTT",
          usernameTwo: "ZZZZZZ",
          text: "你也说的很好",
          createTime: "2023-12-31",
        },
      ],
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
          <>
            {/* 主评论 */}
            <div className="my-6">
              <Space className="w-full" size="large">
                <img
                  src={imgUser}
                  alt="头像"
                  className="w-8 h-8 rounded"
                  style={{ verticalAlign: "text-bottom" }}
                />
                <a href="javascript:0;" className=" text-lg">
                  {item?.userName}
                </a>
                <span>{item?.createTime}</span>
              </Space>
              <p className=" box-border pl-14">{item?.content}</p>
            </div>
            {/* 子评论 */}
            {/* <div className=" box-border pl-14">
              {item.children &&
                item?.children.map((item) => {
                  return (
                    <>
                      <div>
                        <img
                          src={imgUser}
                          alt="头像"
                          className="w-6 h-6 rounded"
                          style={{ verticalAlign: "text-bottom" }}
                        />
                        <span className=" text-lg">{item.usernameOne}</span>
                        {item.usernameTwo && (
                          <>
                            回复
                            <img
                              src={imgUser}
                              alt="头像"
                              className="w-6 h-6 rounded"
                              style={{ verticalAlign: "text-bottom" }}
                            />
                            <span className=" text-lg">{item.usernameTwo}</span>
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
            </div> */}
          </>
        );
      })}
    </div>
  );
}
