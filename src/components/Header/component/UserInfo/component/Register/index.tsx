import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MediumOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Password from "antd/es/input/Password";

export default function Register() {
  return (
    <>
      <Form labelAlign="left" labelCol={{ span: 4 }} className="w-full">
        <Form.Item
          name="email"
          label="email"
          rules={[
            { required: true, message: "请输入邮箱" },
            { max: 10, message: "请输入合法的QQ邮箱" },
          ]}
        >
          <Input
            type="number"
            placeholder="QQ邮箱"
            prefix={<MediumOutlined />}
            addonAfter={<span>@qq.com</span>}
          />
        </Form.Item>
        <Form.Item
          name="username"
          label="User"
          rules={[
            { required: true, message: "请输入QQ号或账号" },
            { max: 10, message: "QQ号或账号不能超过10个字符" },
          ]}
          colon
        >
          <Input
            type="text"
            prefix={<UserOutlined />}
            placeholder="请输入QQ号或账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Pass"
          rules={[{ required: true, message: "请输入密码" }]}
          colon
        >
          <Password
            type="password"
            prefix={<LockOutlined />}
            placeholder="请输入密码"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请再次输入密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
          colon
        >
          <Password
            type="password"
            prefix={<LockOutlined />}
            placeholder="请再次输入密码"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item className="text-center" label="">
          <Button type="primary" htmlType="submit" className="w-full">
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
