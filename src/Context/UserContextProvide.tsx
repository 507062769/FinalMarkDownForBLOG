import { fetchReadMessage, getUnreadCount } from "@/apis/messages";
import store from "@/stores";
import { message as messageBox } from "antd";
import { observer } from "mobx-react-lite";
import { Dispatch, createContext, useEffect, useRef, useState } from "react";

type TUserInfo = {
  userImg: string;
  userName: string;
  registerDays: number;
  vermicelliCount: number;
  pagesNumber: number;
  qq: string;
  school: string;
  prefession: string;
  sex: string;
  description: string;
};

export const UserContext = createContext<{
  isLogin: boolean;
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<React.SetStateAction<string>>;
  userInfo: TUserInfo;
  setUserInfo: Dispatch<React.SetStateAction<TUserInfo>>;
}>({} as any);

const { message } = store;

function UserContextProvide(props: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<TUserInfo>({} as any);
  const { mutateAsync } = getUnreadCount();
  const ws = useRef<WebSocket>();
  const wsMap = {
    // 这里逻辑太臃肿，可以整体拆到ReceiveMessage中
    message: async ({ fromQQ, data }: any) => {
      message.receiveSendMessage(fromQQ, data, userInfo.qq);
    },
    notification: ({ fromQQ, data }: any) => {
      const notificationType = {
        top: "点赞",
        bottom: "点踩",
        comment: "评论",
      };
      const system = message.contactPerson.find((item) => item.qq === "admin")!;
      system.lastDate = Number(data?.lastDate);
      system.unreadCount += 1;
      // 将消息添加到通知中
      const notification =
        notificationType[data?.type as "top" | "bottom" | "comment"];
      message.systemMessageList.push({
        notification,
        from: fromQQ,
        fromQQ,
        pageId: data?.pageid,
        lastDate: data?.lastDate,
      });
      if (
        location.pathname.includes("message") &&
        message.currentChatUser.qq === "admin"
      ) {
        message.contactPerson.find(
          (item) => item.qq === "admin"
        )!.unreadCount = 0;
        PubSub.publish("receiveMessage");
      } else {
        messageBox.success(
          `有人${
            notificationType[data?.type as "top" | "bottom" | "comment"]
          }了你的文章`
        );
      }
      message.updateUnreadAllCount();
    },
  };
  useEffect(() => {
    const unread = async () => {
      if (isLogin) {
        ws.current = new WebSocket(
          `ws://zhangtc.online:9875?qq=${userInfo.qq}`
        );
        const res = await mutateAsync({ qq: userInfo.qq });
        store.message.unreadAllCount = res.unreadCount;
        // 登录状态下建立WebSocket
        ws.current.onmessage = ({ data }) => {
          const wsRes = JSON.parse(data) as any;
          wsMap[wsRes.type as "message" | "notification"](wsRes);
        };
        ws.current.onerror = (error) => {
          console.log(error);
        };
      } else if (ws.current) {
        ws.current.close();
      }
    };
    unread();
  }, [isLogin]);

  return (
    <UserContext.Provider
      value={{ isLogin, setIsLogin, token, setToken, userInfo, setUserInfo }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default observer(UserContextProvide);
