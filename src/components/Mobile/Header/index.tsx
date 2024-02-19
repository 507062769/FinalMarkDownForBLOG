// @ts-nocheck

import { UserContext } from "@/Context/UserContextProvide";
import logo from "@/assets/logo.png";
import { useIndexPage } from "@/hooks/useIndexPage";
import {
  PoweroffOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Space } from "antd";
import { Popover, Swiper } from "antd-mobile";
import { Action } from "antd-mobile/es/components/popover";
import { useContext } from "react";

export default function MHeader() {
  const { isLogin, userInfo } = useContext(UserContext);
  const actions: Action[] = [
    { key: "center", icon: <UserOutlined />, text: "个人中心" },
    { key: "exit", icon: <PoweroffOutlined />, text: "退出登录" },
  ];
  const indexPage = useIndexPage();
  return (
    <>
      <div className="flex flex-row justify-between">
        <img src={logo} className="w-2/5" />
        <Space className="text-lg mr-4">
          <span>首页</span>
          <span>消息</span>
          {isLogin ? (
            <Popover.Menu
              actions={actions}
              placement="bottom-start"
              trigger="click"
            >
              <Avatar src={userInfo.userImg} alt="用户头像" size="large" />
            </Popover.Menu>
          ) : (
            <span>登录</span>
          )}
        </Space>
      </div>

      <div className="flex flex-row mx-auto" style={{ width: "95%" }}>
        <Space.Compact style={{ width: "100%" }}>
          <Input placeholder="输入关键字" />
          <Button type="primary">
            <SearchOutlined />
          </Button>
        </Space.Compact>
      </div>
      <Space direction="vertical" className="my-2">
        <Swiper
          autoplay
          loop
          indicator={(total, current) => (
            <div
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                background: "rgba(0, 0, 0, 0.3)",
                padding: "4px 8px",
                color: "#ffffff",
                borderRadius: "4px",
                userSelect: "none",
              }}
            >
              {`${current + 1} / ${total}`}
            </div>
          )}
        >
          {indexPage.swipe.map((item, index) => (
            <Swiper.Item key={index}>
              <img
                src={item.coverUrl}
                alt={item.title}
                width={"100%"}
                height={"200px"}
              />
              <div
                className="m-0 px-4"
                style={{
                  background: "rgba(0,0,0,.3)",
                  color: "white",
                  marginTop: "-8px",
                }}
              >
                {item.title}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </Space>
    </>
  );
}
