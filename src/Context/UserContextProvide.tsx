import { getUnreadCount } from "@/apis/messages";
import store from "@/stores";
import { observer } from "mobx-react-lite";
import { Dispatch, createContext, useEffect, useState } from "react";

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

function UserContextProvide(props: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<TUserInfo>({} as any);
  const { mutateAsync } = getUnreadCount();
  useEffect(() => {
    const unread = async () => {
      if (isLogin) {
        const res = await mutateAsync({ qq: userInfo.qq });
        store.message.unreadAllCount = res.unreadCount;
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
