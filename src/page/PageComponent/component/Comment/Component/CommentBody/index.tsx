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
              <div className="w-full flex flex-row">
                <img
                  src={imgUser}
                  alt="头像"
                  className="w-8 h-8 rounded flex-shrink-0"
                  style={{ verticalAlign: "text-bottom" }}
                />
                <div className="flex flex-row justify-between ml-4 flex-grow overflow-hidden">
                  <p
                    className=" text-lg my-0 w-4/5 overflow-hidden"
                    style={{
                      overflow: "hidden",
                      textOverflow: "clip",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item?.userName}
                  </p>
                  <span className="ml-auto flex-shrink-0">
                    {item?.createTime}
                  </span>
                </div>
              </div>
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
