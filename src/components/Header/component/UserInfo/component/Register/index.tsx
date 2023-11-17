import { useState, useRef, useEffect } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  LockOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Password from "antd/es/input/Password";

export default function Register() {
  const [isDisabledCodeBtn, setIDisabledCodeBtn] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(5);
  const timer = useRef<any>(null);
  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (countDown < 1) {
      setCountDown(5);
      setIDisabledCodeBtn(false);
      clearInterval(timer.current);
    }
  }, [countDown]);

  return (
    <>
      <Form labelAlign="left" labelCol={{ span: 4 }} className="w-full">
        <Form.Item
          name="qq"
          label="QQ"
          rules={[
            { required: true, message: "请输入QQ" },
            { max: 12, message: "请输入合法的QQ" },
          ]}
        >
          <Input
            type="Number"
            placeholder="QQ号"
            prefix={<QqOutlined />}
            addonAfter={<span>@qq.com</span>}
          />
        </Form.Item>
        <Form.Item
          name="code"
          label="Code"
          rules={[
            { required: true, message: "请输入验证码" },
            { max: 6, message: "请输入6位验证码" },
          ]}
        >
          <Input
            type="Number"
            placeholder="验证码"
            prefix={<KeyOutlined />}
            max={6}
            addonAfter={
              <a
                onClick={(e) => {
                  e.preventDefault();
                  if (isDisabledCodeBtn) {
                    message.warning("稍后重试");
                    return;
                  }
                  setIDisabledCodeBtn(true);
                  clearInterval(timer.current);
                  timer.current = setInterval(() => {
                    setCountDown((countDown) => countDown - 1);
                  }, 1000);
                }}
              >
                {isDisabledCodeBtn ? `${countDown}秒后再重试` : "发送验证码"}
              </a>
            }
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
          label="Confirm"
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
