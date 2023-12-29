import { Avatar, Badge, Space, Tooltip } from "antd";
import moment from "moment";
import classNames from "classnames";
import { useContext, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import store from "@/stores/index";
import { UserContext } from "@/Context/UserContextProvide";
import { Link } from "react-router-dom";
import {
  CommentOutlined,
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { fetchReadMessage, fetchSendMessage } from "@/apis/messages";

function Message() {
  const [msg, setMsg] = useState<string>();
  const customMessage = useRef<any>(null);
  const { userInfo } = useContext(UserContext);
  const { message } = store;
  const startScrollBottom = () => {
    setTimeout(() => {
      if (customMessage.current) {
        // 可以优化，变成缓动
        const currentScrollTop = customMessage.current.scrollTop;
        const scrollHeight = customMessage.current.scrollHeight;
        const difference = scrollHeight - currentScrollTop;
        const duration = 300; // 缓动动画的持续时间，单位为毫秒
        let startTime: any;
        function animationStep(timestamp: any) {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const easeInOutQuad = (t: any) =>
            t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const scrollTop =
            currentScrollTop +
            difference * easeInOutQuad(Math.min(progress / duration, 1));
          customMessage.current.scrollTop = Math.ceil(scrollTop);
          if (progress < duration) {
            requestAnimationFrame(animationStep);
          }
        }
        requestAnimationFrame(animationStep);
      }
    }, 30);
  };

  const { mutateAsync } = fetchSendMessage();
  const { mutateAsync: readMessage } = fetchReadMessage();
  return (
    <div
      className="w-11/12 mx-auto  h-96 flex flex-row"
      style={{ height: "calc(100vh - 154px)" }}
    >
      <ul className="w-3/12 box-border px-0 m-0 overflow-x-auto user-list bg-white">
        {message.contactPerson.map((item) => {
          return (
            <li
              className={classNames(
                "list-none box-border px-4 flex flex-row h-18 py-4 ",
                { "current-user-id": item.qq === message.currentChatUser.qq }
              )}
              style={{ borderBottom: "1px solid #ccc" }}
              onClick={async () => {
                if (item.unreadCount > 0) {
                  // 如果有未读消息，则将其设置为已读
                  await readMessage({
                    targetQQ: userInfo.qq,
                    fromQQ: item.qq,
                  });
                }
                message.setCurrentUserId(item.qq);
              }}
            >
              <Avatar src={item.userImg} size={"large"} />
              <p
                className="m-0 mx-2 text-base w-1/2 flex-shrink"
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
                  className="m-0 text-xs text-left "
                  style={{
                    height: "40px",
                    lineHeight: "40px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {moment(Number(item.lastDate)).format("MM/DD HH:mm:ss")}
                </p>
              </Badge>
            </li>
          );
        })}
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
          {message.currentChatUser.qq === "admin" &&
            message.systemMessageList.map((item) => (
              <>
                <div className="text-center">
                  {moment(Number(item.lastDate)).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                <div className="my-8 flex flex-row">
                  <Avatar
                    src={message.currentChatUser?.userImg}
                    className="w-10 h-10 flex-shrink-0"
                  />
                  <Link to={`/page?pageid=${item.pageId}`}>
                    <div
                      className="my-0 ml-6 px-6 py-6 rounded-lg notification-item"
                      style={{ background: "#ccc" }}
                    >
                      <p
                        className="my-2 text-xl pl-2"
                        style={{ borderBottom: "1px solid #eee" }}
                      >
                        <Space>
                          {item.notification}
                          {item.notification === "点赞" ? (
                            <LikeOutlined />
                          ) : item.notification === "点踩" ? (
                            <DislikeOutlined />
                          ) : (
                            <CommentOutlined />
                          )}
                        </Space>
                      </p>
                      <p className="my-2">
                        <p className="m-0 mx-2 inline-block">
                          {item.from === "未登录用户" ? (
                            <span>未登录用户</span>
                          ) : (
                            <Link
                              to={`/other?qq=${item.fromQQ}`}
                              className="message-user"
                            >
                              {item.from}
                            </Link>
                          )}
                        </p>
                        {item.notification}
                        {item.notification === "点赞" ? (
                          <LikeOutlined />
                        ) : item.notification === "点踩" ? (
                          <DislikeOutlined />
                        ) : (
                          <CommentOutlined />
                        )}
                        &nbsp; 了你的文章
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            ))}
          {message.currentChatUser.qq !== "admin" &&
            message.getCurrentMessageList()?.map((item) => {
              const isMe = item.fromQQ === userInfo.qq;
              return (
                <div
                  className={`message-list-item flex my-4 ${
                    isMe ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar
                    src={
                      isMe ? userInfo.userImg : message.currentChatUser?.userImg
                    }
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
                  <span
                    className="mx-2 opacity-20 flex-shrink-0 mt-auto message-list-item-sendTime"
                    style={{ lineHeight: "40px" }}
                  >
                    {moment(Number(item.lastDate)).format("MM/DD HH:mm:ss")}
                  </span>
                </div>
              );
            })}
        </div>
        {message.currentChatUser.qq !== "admin" && (
          <div className="h-1/5 flex-shrink-0" id="TextArea">
            <TextArea
              value={msg}
              className="text-lg h-full"
              maxLength={100}
              rows={2}
              onFocus={() => {
                startScrollBottom();
              }}
              allowClear
              showCount
              placeholder="按下Enter发送消息"
              onChange={(e) => {
                // 清除左右空格
                if (e.target.value.trim() === "") {
                  setMsg("");
                  return;
                }
                setMsg(e.target.value);
              }}
              onPressEnter={async (e: any) => {
                if (!e.target.value) {
                  return;
                }
                const lastDate = +new Date() + "";
                await mutateAsync({
                  targetQQ: message.currentChatUser.qq,
                  qq: userInfo.qq,
                  content: e.target.value,
                  lastDate,
                });
                message.addNewMessage(e.target.value, lastDate, userInfo.qq);
                startScrollBottom();
                setMsg("");
              }}
              style={{
                border: "none",
                borderTop: "1px solid #ccc",
                borderRadius: "0",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(Message);
