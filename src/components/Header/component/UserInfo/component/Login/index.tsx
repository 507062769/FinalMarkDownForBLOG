import { useFetchLogin } from "@/apis/userInfo";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import bcrypt from "bcryptjs";

export default function Login() {
  const [form] = useForm();
  const { mutateAsync: login } = useFetchLogin();
  return (
    <Form
      form={form}
      labelAlign="left"
      labelCol={{ span: 4 }}
      className="w-full"
      onFinish={async () => {
        const pass = form.getFieldValue("password");
        const { pass: resPass } = await login({
          qq: form.getFieldValue("username"),
        });

        const isSuccess = await bcrypt.compare(pass, resPass);
        if (isSuccess) {
          message.success("登录成功");
          // 获取token
        } else {
          message.error("密码错误");
        }
      }}
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
      <Form.Item className="text-right">
        <Button type="link">忘记密码</Button>
      </Form.Item>
      <Form.Item className="text-center" label="">
        <Button type="primary" htmlType="submit" className="w-full">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
