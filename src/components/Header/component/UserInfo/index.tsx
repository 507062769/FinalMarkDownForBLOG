import UserImg from "@/assets/imgUser.jpg";
import {
  PlusCircleOutlined,
  SettingOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Tabs } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState, useEffect } from "react";
import Login from "./component/Login";
import Register from "./component/Register";
import useModalStyle from "./useModalStyle";
import { Link } from "react-router-dom";

export default function UserInfo() {
  const [open, setOpen] = useState<boolean>(false);
  const [_, setTabKey] = useState<string>("登录");
  const { classNames, modalStyles } = useModalStyle();
  const isLogin = true;
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
            <Avatar src={UserImg} alt="用户头像" size="large" />
            <ul className="list-none m-0 p-0 w-32 -z-50" id="Menu">
              <li>
                <UserOutlined className="mr-2" />
                个人中心
              </li>
              {/* <li>
                <SettingOutlined className="mr-2" />
                个人设置
              </li> */}
              <li>
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
        <Link to={"message"}>
          <Badge count={1} color="#1677ff" size="small">
            <span className="text-base">消息</span>
          </Badge>
        </Link>
      </p>
      <p className="block m-0 cursor-pointer" style={{ lineHeight: "64px" }}>
        <Link to={"search"}>
          <span className="text-base">随笔</span>
        </Link>
      </p>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        className="h-10 mt-3"
        size="large"
      >
        创作
      </Button>
      <Modal
        destroyOnClose
        title="登录"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        classNames={classNames}
        styles={modalStyles}
      >
        <Tabs
          items={[
            { key: "login", label: "登录", children: <Login /> },
            { key: "register", label: "注册", children: <Register /> },
          ]}
          onChange={setTabKey}
        ></Tabs>
      </Modal>
    </section>
  );
}
