import { fetchSendMessage } from "@/apis/aichat";
import store from "@/stores";
import { Avatar } from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

function AI() {
  const { aiChat } = store;
  const [msg, setMsg] = useState<string>();
  const { mutateAsync } = useMutation(fetchSendMessage);
  useEffect(() => {
    if (aiChat) {
      aiChat.init();
    }
  }, []);
  return (
    <div
      className="w-11/12 mx-auto  h-96 flex flex-row"
      style={{ height: "calc(100vh - 154px)" }}
    >
      <ul className="w-3/12 box-border px-0 m-0 overflow-x-auto user-list bg-white">
        <li
          className={classNames(
            "list-none box-border px-4 flex flex-row h-18 py-4 ",
            { "current-user-id": aiChat.getCurrentContext === -9999 }
          )}
          style={{ borderBottom: "1px solid #ccc" }}
          onClick={async () => {
            aiChat.setCurrentContext(-9999);
          }}
        >
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
            <Avatar src={"https://bce.bdstatic.com/img/favicon.ico"} />
            <span>&nbsp;创建新对话</span>
          </p>
        </li>
        {aiChat.getChatList.map((item) => {
          return (
            <li
              className={classNames(
                "list-none box-border px-4 flex flex-row h-18 py-4 ",
                { "current-user-id": item.key === aiChat.getCurrentContext }
              )}
              style={{ borderBottom: "1px solid #ccc" }}
              onClick={async () => {
                aiChat.setCurrentContext(item.key);
              }}
            >
              <p
                className="m-0 mx-2 text-base flex-shrink"
                style={{
                  height: "40px",
                  lineHeight: "40px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <span>{item.content[0].content}</span>
              </p>
            </li>
          );
        })}
      </ul>
      <div
        className="w-9/12 bg-white box-border flex flex-col"
        style={{ borderLeft: "1px solid #ccc" }}
        id="CustomTextarea"
      >
        <div
          className="flex-grow p-4 overflow-y-auto"
          id="CustomMessage"
          // ref={customMessage}
        >
          {aiChat.getCurrentContent!?.map((item) => {
            const isMe = item.role === "user";
            return (
              <div
                className={`message-list-item flex my-4 ${
                  isMe ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <p
                  style={{
                    background: `${isMe ? "#95ec69" : "#b8b8b9"}`,
                    lineHeight: "40px",
                  }}
                  className={`m-0 rounded-3xl px-4 ${isMe ? "mr-2" : "ml-2"}`}
                >
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>
        <div className="h-1/5 flex-shrink-0" id="TextArea">
          <TextArea
            value={msg}
            className="text-lg h-full"
            maxLength={100}
            rows={2}
            // onFocus={() => {
            //   startScrollBottom();
            // }}
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
              if (aiChat.getCurrentContext === -9999) {
                aiChat.newChat(+new Date(), msg as string);
              } else {
                aiChat.addMessage({
                  key: aiChat.getCurrentContext,
                  role: "user",
                  content: msg as string,
                });
              }
              setMsg("");
              await mutateAsync(aiChat.getCurrentContent);
            }}
            style={{
              border: "none",
              borderTop: "1px solid #ccc",
              borderRadius: "0",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(AI);
