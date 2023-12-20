import { Avatar, Badge, Input, Tooltip } from "antd";
import moment from "moment";
import classNames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import store from "@/stores/index";
import { UserContext } from "@/Context/UserContextProvide";

function Message() {
  const [msg, setMsg] = useState<string>();
  const customMessage = useRef<any>(null);
  const { userInfo } = useContext(UserContext);
  const { message } = store;
  const startScrollBottom = () => {
    setTimeout(() => {
      if (customMessage.current) {
        // 可以优化，变成缓动
        customMessage.current.scrollTop = customMessage.current.scrollHeight;
      }
    }, 10);
  };
  useEffect(() => {
    startScrollBottom();
  }, [message.currentChatUser]);
  return (
    <div
      className="w-11/12 mx-auto  h-96 flex flex-row"
      style={{ height: "calc(100vh - 154px)" }}
    >
      <ul className="w-3/12 box-border px-0 m-0 overflow-x-auto user-list bg-white">
        {message.contactPerson.map((item) => (
          <li
            className={classNames(
              "list-none box-border px-4 flex flex-row h-18 py-4 ",
              { "current-user-id": message.currentChatUser.qq === item.qq }
            )}
            style={{ borderBottom: "1px solid #ccc" }}
            onClick={() => {
              message.setCurrentUserId(item.qq);
            }}
          >
            <Avatar src={item.userImg} size={"large"} />
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
                {moment(item.lastDate).format("YYYY/MM/DD")}
              </p>
            </Badge>
          </li>
        ))}
      </ul>
      <div
        className="w-9/12 bg-white box-border flex flex-col"
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
          {message.currentChatUser.userName}
        </h1>
        <div
          className="flex-grow p-4 overflow-y-auto"
          id="CustomMessage"
          ref={customMessage}
        >
          {message.getCurrentUserMessageList()?.map((item) => {
            const isMe = item.from === userInfo.qq;
            return (
              <div
                className={`flex my-4 ${
                  isMe ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar
                  src={message.getCurrentUserInfo()?.userImg}
                  className="w-10 h-10 flex-shrink-0"
                />
                <p
                  style={{
                    background: `${isMe ? "#95ec69" : "#b8b8b9"}`,
                    lineHeight: "40px",
                  }}
                  className={`m-0 rounded-3xl px-4 ${isMe ? "mr-2" : "ml-2"}`}
                >
                  {item.messageContent}
                </p>
              </div>
            );
          })}
        </div>
        {message.currentChatUser.qq !== "系统" && (
          <div className="h-1/5" id="TextArea">
            <Input
              value={msg}
              className="text-lg h-full"
              maxLength={100}
              allowClear
              placeholder="按下Enter发送消息"
              onChange={(e) => setMsg(e.target.value)}
              onPressEnter={(e: any) => {
                message.addNewMessage(e.target.value, userInfo.qq);
                setMsg("");
                startScrollBottom();
              }}
              style={{
                border: "none",
                borderTop: "1px solid #ccc",
                borderRadius: "0",
              }}
              disabled={message.currentChatUser.qq === "系统"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(Message);
