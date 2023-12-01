import { Avatar, Badge, Button, Input, Space, Tooltip, message } from "antd";
import userImg from "@/assets/userImg.jpg";
import userImg2 from "@/assets/userImg2.jpg";
import moment from "moment";
import classNames from "classnames";
import { useUserMessage } from "./useUserMessage";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef } from "react";

export default function Message() {
  const { currentUserId, setCurrentUserId, userMessageList } = useUserMessage();
  const customMessage = useRef<any>(null);
  console.log("two");
  const startScrollBottom = () => {
    setTimeout(() => {
      if (customMessage.current) {
        customMessage.current.scrollTop = customMessage.current.scrollHeight;
      }
    }, 10);
  };
  useEffect(() => {
    startScrollBottom();
  }, [currentUserId]);
  return (
    <div
      className="w-11/12 mx-auto  h-96 flex flex-row"
      style={{ height: "calc(100vh - 154px)" }}
    >
      <ul className="w-3/12 box-border px-0 m-0 overflow-x-auto user-list bg-white">
        {userMessageList.map((item) => (
          <li
            className={classNames(
              "list-none box-border px-4 flex flex-row h-18 py-4 ",
              { "current-user-id": currentUserId === item.userId }
            )}
            style={{ borderBottom: "1px solid #ccc" }}
            onClick={() => setCurrentUserId(item.userId)}
          >
            <Avatar src={userImg} size={"large"} />
            <p
              className="m-0 ml-4 text-base w-1/2"
              style={{
                height: "40px",
                lineHeight: "40px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <Tooltip title={item.userName}>
                <span>{item.userName}</span>
              </Tooltip>
            </p>
            <Badge count={item.unreadCount} offset={[14, 20]}>
              <p
                className="m-0 ml-2 text-sm text-left"
                style={{ height: "40px", lineHeight: "40px" }}
              >
                {moment(item.lastMessageTime).format("YYYY/MM/DD")}
              </p>
            </Badge>
          </li>
        ))}
      </ul>
      <div
        className="w-9/12 bg-white box-border flex flex-col pb-8"
        style={{ borderLeft: "1px solid #ccc" }}
        id="CustomTextarea"
      >
        <h1
          style={{
            borderBottom: "1px solid #ccc",
            height: "72px",
            lineHeight: "72px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          className="pl-8 m-0 text-center flex-shrink-0"
        >
          {
            userMessageList.find((item) => item.userId === currentUserId)
              ?.userName
          }
        </h1>
        <div
          className="flex-grow p-4 overflow-y-auto"
          id="CustomMessage"
          ref={customMessage}
        >
          <div className="flex flex-row my-4">
            <Avatar src={userImg2} className="w-10 h-10 flex-shrink-0" />
            <p
              style={{ background: "#b8b8b9", lineHeight: "40px" }}
              className="m-0 rounded-3xl px-4 ml-2 w-10/12"
            >
              你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干
            </p>
          </div>
          <div className="flex flex-row-reverse my-4">
            <Avatar src={userImg2} className="w-10 h-10 flex-shrink-0" />
            <p
              style={{ background: "#95ec69", lineHeight: "40px" }}
              className="m-0 rounded-3xl px-4 mr-2"
            >
              你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干
            </p>
          </div>
          <div className="flex flex-row-reverse my-4">
            <Avatar src={userImg2} className="w-10 h-10 flex-shrink-0" />
            <p
              style={{ background: "#95ec69", lineHeight: "40px" }}
              className="m-0 rounded-3xl px-4 mr-2"
            >
              你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干
            </p>
          </div>
          <div className="flex flex-row-reverse my-4">
            <Avatar src={userImg2} className="w-10 h-10 flex-shrink-0" />
            <p
              style={{ background: "#95ec69", lineHeight: "40px" }}
              className="m-0 rounded-3xl px-4 mr-2"
            >
              你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干
            </p>
          </div>
          <div className="flex flex-row-reverse my-4">
            <Avatar src={userImg2} className="w-10 h-10 flex-shrink-0" />
            <p
              style={{ background: "#95ec69", lineHeight: "40px" }}
              className="m-0 rounded-3xl px-4 mr-2"
            >
              你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干
            </p>
          </div>
          <div className="flex flex-row-reverse my-4">
            <Avatar src={userImg2} className="w-10 h-10 flex-shrink-0" />
            <p
              style={{ background: "#95ec69", lineHeight: "40px" }}
              className="m-0 rounded-3xl px-4 mr-2"
            >
              你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干
            </p>
          </div>
          <div className="flex flex-row-reverse my-4">
            <Avatar src={userImg2} className="w-10 h-10 flex-shrink-0" />
            <p
              style={{ background: "#95ec69", lineHeight: "40px" }}
              className="m-0 rounded-3xl px-4 mr-2"
            >
              你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干
            </p>
          </div>
          <div className="flex flex-row-reverse my-4">
            <Avatar src={userImg2} className="w-10 h-10 flex-shrink-0" />
            <p
              style={{ background: "#95ec69", lineHeight: "40px" }}
              className="m-0 rounded-3xl px-4 mr-2"
            >
              你在干嘛你在干嘛你在干你在干嘛你在干嘛你在干你在干
            </p>
          </div>
        </div>
        <div className="relative" id="TextArea">
          <TextArea
            className="text-lg"
            autoSize={{ minRows: 5, maxRows: 5 }}
            maxLength={100}
            allowClear
            placeholder="按下Enter发送消息"
            style={{
              border: "none",
              borderTop: "1px solid #ccc",
              borderRadius: "0",
            }}
            onPressEnter={() => {
              message.warning("发送");
            }}
          />
        </div>
      </div>
    </div>
  );
}
