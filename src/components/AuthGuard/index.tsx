import { UserContext } from "@/Context/UserContextProvide";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard(props: any) {
  const { isLogin } = useContext(UserContext);
  return <>{isLogin ? props.children : <Navigate to="/" />}</>;
}
