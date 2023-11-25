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
import { useForm } from "antd/es/form/Form";
import { useFetchRegister, useGetCode } from "@/apis/userInfo";
import passEncipher from "@/utils/passEncipher";
import bcrypt from "bcryptjs";

export default function Register() {
  const [isDisabledCodeBtn, setIDisabledCodeBtn] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(60);
  const [form] = useForm();
  const timer = useRef<any>(null);
  const { mutateAsync: register, isLoading } = useFetchRegister();
  const { mutateAsync: getCode } = useGetCode();

  const checkCodeBtn = async (e: any) => {
    e.preventDefault();
    let isQQCheckSuccess = false;
    await form
      .validateFields(["qq"])
      .then(() => {
        isQQCheckSuccess = true;
        return;
      })
      .catch(() => {});
    if (!isQQCheckSuccess) {
      return;
    }
    if (isDisabledCodeBtn) {
      message.warning("稍后重试");
      return;
    }
    await getCode({ qq: form.getFieldValue("qq") });
    setIDisabledCodeBtn(true);
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
  };
  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (countDown < 1) {
      setCountDown(60);
      setIDisabledCodeBtn(false);
      clearInterval(timer.current);
    }
  }, [countDown]);

  return (
    <>
      <Form
        labelAlign="left"
        labelCol={{ span: 4 }}
        className="w-full"
        form={form}
        onFinish={async () => {
          const { qq, code, password } = form.getFieldsValue([
            "qq",
            "code",
            "password",
          ]);
          // 对密码进行加密
          const { pass } = passEncipher(password);
          await register({ qq, code, pass });
        }}
      >
        <Form.Item
          name="qq"
          label="QQ"
          rules={[
            { required: true, message: "请输入QQ" },
            { max: 12, message: "请输入合法的QQ" },
            { min: 6, message: "请输入合法的QQ" },
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
            { min: 6, message: "请输入6位验证码" },
          ]}
        >
          <Input
            type="Number"
            placeholder="验证码"
            prefix={<KeyOutlined />}
            addonAfter={
              <a onClick={checkCodeBtn}>
                {isDisabledCodeBtn ? `${countDown}秒后再重试` : "发送验证码"}
              </a>
            }
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
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isLoading}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
