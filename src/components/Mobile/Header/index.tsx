// @ts-nocheck

import { TabContext, TabContextProvide } from "@/Context/TabContextProvide";
import { UserContext } from "@/Context/UserContextProvide";
import logo from "@/assets/logo.png";
import { useIndexPage } from "@/hooks/useIndexPage";
import { useLogin } from "@/hooks/useLogin";
import {
  PoweroffOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Space, message } from "antd";
import { Popover, Swiper } from "antd-mobile";
import { Action } from "antd-mobile/es/components/popover";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function MHeader() {
  const { isLogin, userInfo, setIsLogin, setToken } = useContext(UserContext);
  const actions: Action[] = [
    { key: "center", icon: <UserOutlined />, text: "个人中心" },
    { key: "exit", icon: <PoweroffOutlined />, text: "退出登录" },
  ];
  const navigate = useNavigate();
  const { open, setOpen, tabKey, setTabKey } = useContext(TabContext);
  const { NodeModel } = useLogin({ open, setOpen, tabKey, setTabKey });
  return (
    <>
      <div className="flex flex-row justify-between">
        <img src={logo} className="w-2/5" onClick={() => navigate("/mobile")} />
        <Space className="text-lg mr-4">
          {isLogin ? (
            <>
              <span>{userInfo.userName}</span>
              <Popover.Menu
                actions={actions}
                placement="bottom-start"
                trigger="click"
                onAction={({ key }) => {
                  if (key === "center") {
                    console.log("跳转至个人中心");
                  } else {
                    message.success("成功退出登录");
                    setIsLogin(false);
                    setToken("");
                    localStorage.setItem("BLOG_TOKEN", "");
                  }
                }}
              >
                <Avatar src={userInfo.userImg} alt="用户头像" size="large" />
              </Popover.Menu>
            </>
          ) : (
            <span onClick={() => setOpen(true)}>登录</span>
          )}
        </Space>
      </div>
      {NodeModel}
    </>
  );
}
