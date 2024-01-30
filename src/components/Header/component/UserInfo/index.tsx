import { useContext } from "react";
import {
  PlusCircleOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Tabs, message as messageBox } from "antd";
import Modal from "antd/es/modal/Modal";
import Login from "./component/Login";
import Register from "./component/Register";
import { Link } from "react-router-dom";
import { createStyles, useTheme } from "antd-style";
import { TabContext } from "@/Context/TabContextProvide";
import { UserContext } from "@/Context/UserContextProvide";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import store from "@/stores";

function UserInfo() {
  const { message } = store;
  const { tabKey, setTabKey, open, setOpen } = useContext(TabContext);
  const { isLogin, setToken, setIsLogin, userInfo, setUserInfo } =
    useContext(UserContext);
  const token = useTheme();
  const navigate = useNavigate();
  const useStyle = createStyles(({ token }) => ({
    "my-modal-mask": {
      boxShadow: `inset 0 0 15px #fff`,
    },
    "my-modal-header": {
      // borderBottom: `1px dotted ${token.colorPrimary}`,
      textAlign: "center",
      opacity: "0",
    },
    "my-modal-footer": {
      color: token.colorPrimary,
    },
    "my-modal-content": {
      border: "1px solid #333",
    },
  }));
  const { styles } = useStyle();
  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
  };
  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {
      // boxShadow: "inset 0 0 5px #999",
      borderRadius: 5,
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    footer: {
      borderTop: "1px solid #333",
    },
    content: {
      boxShadow: "0 0 30px #999",
    },
  };

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
          <p
            className="block m-0 cursor-pointer"
            style={{ lineHeight: "64px" }}
            onClick={() => setOpen(true)}
          >
            登录
          </p>
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
      <Modal
        destroyOnClose
        title="登录"
        open={open}
        onCancel={() => {
          setOpen(false);
          setTabKey("login");
        }}
        footer={null}
        classNames={classNames}
        styles={modalStyles}
      >
        <Tabs
          destroyInactiveTabPane
          centered
          activeKey={tabKey}
          onChange={setTabKey}
          items={[
            { key: "login", label: "登录", children: <Login /> },
            { key: "register", label: "注册", children: <Register /> },
            {
              key: "forget",
              label: "忘记密码",
              children: <Register />,
            },
          ]}
        />
      </Modal>
    </section>
  );
}

export default observer(UserInfo);
