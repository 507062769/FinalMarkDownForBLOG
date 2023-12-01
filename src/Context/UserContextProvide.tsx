import { Dispatch, createContext, useState } from "react";

type TUserInfo = {
  userImg: string;
  userName: string;
  registerDays: number;
  vermicelliCount: number;
  pagesNumber: number;
  qq: number;
  school: string;
  profession: string;
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
  const [userInfo, setUserInfo] = useState<TUserInfo>({
    userImg: "http://localhost:33450/uploads/user-2458015575.jpg",
    userName: "这是一个用户名",
    registerDays: 99,
    vermicelliCount: 99,
    pagesNumber: 99,
    qq: 2458015575,
    school: "这是一个学校",
    profession: "这是一个职业",
    sex: "男",
    desc: "这是一个描述",
  });

  return (
    <UserContext.Provider
      value={{ isLogin, setIsLogin, token, setToken, userInfo, setUserInfo }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
