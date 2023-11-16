import UserImg from "@/assets/imgUser.jpg";
import {
  PlusCircleOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Tabs } from "antd";
import Modal from "antd/es/modal/Modal";
import { createStyles, useTheme } from "antd-style";
import { useState } from "react";
import TabPane from "antd/es/tabs/TabPane";

const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    background: token["blue-1"],
    padding: token.paddingSM,
  },
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

export default function UserInfo() {
  const { styles } = useStyle();
  const token = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [tabkey, setTabKey] = useState<string>("登录");
  const classNames = {
    body: styles["my-modal-body"],
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
  const isLogin = false;
  return (
    <section
      className="flex justify-between h-16"
      style={{ lineHeight: "64px" }}
    >
      <div className="relative text-center" id="Login">
        {isLogin ? (
          <>
            <Avatar src={UserImg} alt="用户头像" size="large" />
            <ul className="list-none m-0 p-0 w-32" id="Menu">
              <li>
                <UserOutlined className="mr-2" />
                个人中心
              </li>
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
        <Badge count={1} color="#1677ff" size="small">
          <span className="text-base">消息</span>
        </Badge>
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
        title="登录"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        classNames={classNames}
        styles={modalStyles}
      >
        <Tabs activeKey={tabkey} onChange={setTabKey}>
          <TabPane key="登录" tab="登录" />
          <TabPane key="注册" tab="注册" />
        </Tabs>
      </Modal>
    </section>
  );
}
