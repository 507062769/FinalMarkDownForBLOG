import { fetchSalt, useFetchLogin } from "@/apis/userInfo";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext } from "react";
import { TabContext } from "@/Context/TabContextProvide";
import passEncipherTwo from "@/utils/passEncipherTwo";
import { UserContext } from "@/Context/UserContextProvide";
import moment from "moment";
import { getUnreadCount } from "@/apis/messages";
import store from "@/stores";

export default function Login() {
  const { setToken, setIsLogin, setUserInfo } = useContext(UserContext);
  const [loginForm] = useForm();
  const { setTabKey, setOpen } = useContext(TabContext);
  const { mutateAsync: login, isLoading } = useFetchLogin();
  const { mutateAsync: getSalt } = fetchSalt();
  const { mutateAsync } = getUnreadCount();
  const handleLogin = async () => {
    const { password, username } = loginForm.getFieldsValue([
      "username",
      "password",
    ]);
    // 加第二次盐，从数据库获取
    const { salt } = await getSalt({ qq: username, isCreate: false });
    const pass = await passEncipherTwo(password, username, salt);
    const res = await login({ qq: username, pass });
    if (res.isLogin) {
      // 登录成功
      setToken(() => res.token);
      setOpen(false);
      setUserInfo({
        ...res.userInfo,
        registerDays: moment().diff(Number(res.userInfo.registerDate), "days"),
      });
      localStorage.setItem("BLOG_TOKEN", res.token);
      const resUnreadCount = await mutateAsync({ qq: username });
      store.message.unreadAllCount = resUnreadCount.unreadCount;
      setIsLogin(true);
    }
  };
  return (
    <Form
      form={loginForm}
      labelAlign="left"
      labelCol={{ span: 4 }}
      className="w-full"
      onFinish={handleLogin}
    >
      <Form.Item
        name="username"
        label="QQ"
        rules={[
          { required: true, message: "请输入QQ" },
          { max: 12, message: "请输入合法的QQ" },
          { min: 6, message: "请输入合法的QQ" },
        ]}
        colon
      >
        <Input
          type="number"
          prefix={<UserOutlined />}
          placeholder="请使用QQ号登录"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Pass"
        rules={[
          { required: true, message: "请输入密码" },
          { max: 16, message: "密码最长16位" },
          { min: 6, message: "密码最短6位" },
        ]}
        colon
      >
        <Input.Password
          type="password"
          prefix={<LockOutlined />}
          placeholder="请输入密码"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-between">
          <Button type="link" onClick={() => setTabKey("register")}>
            注册
          </Button>
          <Button type="link" onClick={() => setTabKey("forget")}>
            忘记密码
          </Button>
        </div>
      </Form.Item>
      <Form.Item className="text-center" label="">
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isLoading}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
