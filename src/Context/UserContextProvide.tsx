import { Dispatch, createContext, useState } from "react";

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
  desc: string;
};

export const UserContext = createContext<{
  isLogin: boolean;
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<React.SetStateAction<string>>;
  userInfo: TUserInfo;
  setUserInfo: Dispatch<React.SetStateAction<TUserInfo>>;
}>({} as any);

export default function UserContextProvide(props: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<TUserInfo>({} as any);

  return (
    <UserContext.Provider
      value={{ isLogin, setIsLogin, token, setToken, userInfo, setUserInfo }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
