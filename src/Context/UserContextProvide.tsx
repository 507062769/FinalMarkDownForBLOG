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
  const { mutateAsync: read } = fetchReadMessage();
  const ws = useRef<WebSocket>();
  const wsMap = {
    // 这里逻辑太臃肿，可以整体拆到ReceiveMessage中
    message: async ({ fromQQ, data }: any) => {
      // 判断当前收到的消息是否在对话列表中，并处理联系人数据
      if (message.contactPerson.findIndex((item) => item.qq === fromQQ) < 0) {
        // 不在联系人列表中所以需要添加
        message.addConversation({ qq: fromQQ, ...data, unreadCount: 1 });
      } else {
        const targetChat =
          message.contactPerson.find((item) => item.qq === fromQQ)! || {};
        targetChat!.unreadCount += 1;
        targetChat.lastDate = Number(data.lastDate);
        if (targetChat.qq === message.currentChatUser.qq) {
          // 如果消息的发送者，与当前会话用户，刚好是同一个，则说明不需要更改数量
          targetChat.unreadCount = 0;
          // 将此条消息置为已读
          await read({ targetQQ: userInfo.qq, fromQQ });
          // 将消息窗口滑动到底部，可以用pubsub
          PubSub.publish("receiveMessage");
        }
      }
      console.log(message.currentChatUser.qq, fromQQ, "outer");

      // 处理具体的消息列表
      // 根据pathname做不同的处理
      if (location.pathname.includes("message")) {
        message.receiveMessage({
          targetQQ: userInfo.qq,
          fromQQ,
          messageContent: data.content,
          lastDate: data.lastDate,
        });
        // 还需要判断当前选中的是否是发送过来的那个，如果是，则修改未读消息数量，
      }
      if (
        message.currentChatUser.qq !== fromQQ ||
        !location.pathname.includes("message")
      ) {
        messageBox.success("收到了一条消息");
      }
      message.updateUnreadAllCount();
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
      const notification = notificationType[data?.type];
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
        messageBox.success(`有人${notificationType[data?.type]}了你的文章`);
      }
      message.updateUnreadAllCount();
    },
  };
  useEffect(() => {
    const unread = async () => {
      if (isLogin) {
        ws.current = new WebSocket(`ws://localhost:9875?qq=${userInfo.qq}`);
        const res = await mutateAsync({ qq: userInfo.qq });
        store.message.unreadAllCount = res.unreadCount;
        // 登录状态下建立WebSocket
        ws.current.onmessage = ({ data }) => {
          const wsRes = JSON.parse(data) as any;
          wsMap[wsRes.type](wsRes);
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
