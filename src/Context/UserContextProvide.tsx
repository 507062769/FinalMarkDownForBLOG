import { Dispatch, createContext, useState } from "react";

export const UserContext = createContext<{
  isLogin: boolean;
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<React.SetStateAction<string>>;
}>({} as any);

export default function UserContextProvide(props: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string>("");
  return (
    <UserContext.Provider value={{ isLogin, setIsLogin, token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
}
