import { getUnreadCount } from "@/apis/messages";
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

const wsMap = {
  message: ({ fromQQ, data }: any) => {
    console.log(fromQQ, data);
    // 判断当前收到的消息是否在对话列表中，并处理联系人数据
    if (message.contactPerson.findIndex((item) => item.qq === fromQQ) < 0) {
      // 不在联系人列表中所以需要添加
      message.addConversation({ qq: fromQQ, ...data, unreadCount: 1 });
    } else {
      const targetChat =
        message.contactPerson.find((item) => item.qq === fromQQ)! || {};
      targetChat!.unreadCount += 1;
      targetChat.lastDate = Number(data.lastDate);
    }
    message.updateUnreadAllCount();

    // 处理具体的消息列表
    // 根据pathname做不同的处理
    if (location.pathname.includes("message")) {
      // 在消息页
    } else {
      messageBox.success("收到了一条消息");
    }
  },
  notification: (wsRes: any) => {
    const notificationType = {
      top: "赞",
      bottom: "踩",
      comment: "评论",
    };
    messageBox.success(`有人${notificationType[wsRes?.data?.type]}了你的文章`);
    // 进行通知操作
  },
};

function UserContextProvide(props: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<TUserInfo>({} as any);
  const { mutateAsync } = getUnreadCount();
  const ws = useRef<WebSocket>();

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
