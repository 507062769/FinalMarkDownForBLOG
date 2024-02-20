import { LoginTabProps } from "@/Context/TabContextProvide";
import Login from "@/components/Header/component/UserInfo/component/Login";
import Register from "@/components/Header/component/UserInfo/component/Register";
import { Modal, Tabs } from "antd";
import { createStyles, useTheme } from "antd-style";

export function useLogin({ open, setOpen, tabKey, setTabKey }: LoginTabProps) {
  const token = useTheme();
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
  const NodeModel = (
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
  );
  return {
    NodeModel,
  };
}
