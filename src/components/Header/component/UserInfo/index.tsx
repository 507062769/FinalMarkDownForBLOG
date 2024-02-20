import { useContext } from "react";
import {
  PlusCircleOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, message as messageBox } from "antd";
import { Link } from "react-router-dom";
import { TabContext } from "@/Context/TabContextProvide";
import { UserContext } from "@/Context/UserContextProvide";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import store from "@/stores";
import { useLogin } from "@/hooks/useLogin";

function UserInfo() {
  const { message } = store;
  const { tabKey, setTabKey, open, setOpen } = useContext(TabContext);
  const { isLogin, setToken, setIsLogin, userInfo, setUserInfo } =
    useContext(UserContext);
  const navigate = useNavigate();

  const { NodeModel } = useLogin({ tabKey, setTabKey, open, setOpen });

  return (
    <section
      className="flex justify-between h-16"
      style={{
        lineHeight: "64px",
      }}
    >
      <div className="relative text-center" id="Login">
        {isLogin ? (
          <>
            <Avatar src={userInfo.userImg} alt="用户头像" size="large" />
            <ul className="list-none m-0 p-0 w-32 -z-50" id="Menu">
              <li>
                <Link to={"user"}>
                  <UserOutlined className="mr-2" />
                  个人中心
                </Link>
              </li>
              {/* <li>
                <SettingOutlined className="mr-2" />
                个人设置
              </li> */}
              <li
                onClick={() => {
                  setToken("");
                  setIsLogin(false);
                  localStorage.removeItem("BLOG_TOKEN");
                  setUserInfo({} as any);
                  message.unreadAllCount = 0;
                  PubSub.unsubscribe("receiveMessage");
                }}
              >
                <StopOutlined className="mr-2" />
                退出登录
              </li>
            </ul>
          </>
        ) : (
          <span
            className="block m-0 cursor-pointer text-base"
            style={{ lineHeight: "64px" }}
            onClick={() => setOpen(true)}
          >
            登录
          </span>
        )}
      </div>
      <p className="block m-0 cursor-pointer" style={{ lineHeight: "64px" }}>
        <Link to="/">
          <span className="text-base">首页</span>
        </Link>
      </p>
      <p className="block m-0 cursor-pointer" style={{ lineHeight: "64px" }}>
        <Link
          to={"message"}
          onClick={() => {
            message.setCurrentUserId("admin");
          }}
        >
          <Badge count={message.unreadAllCount} color="#1677ff" size="small">
            <span className="text-base">消息</span>
          </Badge>
        </Link>
      </p>
      {/* <p className="block m-0 cursor-pointer" style={{ lineHeight: "64px" }}>
        <Link to={"ai"}>
          <span className="text-base">AI-Chat</span>
        </Link>
      </p> */}
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        className="h-10 mt-3"
        size="large"
        onClick={() => {
          if (isLogin && location.pathname !== "/create") {
            navigate("/create");
          } else if (!isLogin) {
            messageBox.warning("请先登录");
          }
        }}
      >
        创作
      </Button>
      {NodeModel}
    </section>
  );
}

export default observer(UserInfo);
