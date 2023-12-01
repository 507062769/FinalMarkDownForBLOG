import { UserContext } from "@/Context/UserContextProvide";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthGuard(props: any) {
  const navigate = useNavigate();
  const { isLogin } = useContext(UserContext);
  if (!isLogin) {
    navigate("/");
  } else {
    return props.children;
  }
}
