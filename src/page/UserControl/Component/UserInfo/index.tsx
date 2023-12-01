import { UserContext } from "@/Context/UserContextProvide";
import { AlertOutlined, ContainerOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Upload,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { useContext, useState } from "react";

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传图片文件");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("头像大小限制为2M");
  }
  return isJpgOrPng && isLt2M;
};

export default function UserInfo() {
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const {
    userImg,
    userName,
    registerDays,
    vermicelliCount,
    pagesNumber,
    qq,
    profession,
    school,
    sex,
    desc,
  } = userInfo;
  // const { } = useMemo(() => userInfo, [userInfo])
  return (
    <>
      <div className=" w-10/12  mx-auto" style={{ backgroundColor: "#f3f2ee" }}>
        <header
          className="flex flex-row justify-start"
          style={{ borderBottom: "10px solid white" }}
        >
          <div className="w-52 box-border pt-4">
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader overflow-hidden  text-center h-full"
              showUploadList={false}
              action="http://localhost:33450/upload"
              beforeUpload={beforeUpload}
              onChange={({ file }: any) => {
                if (file?.response) {
                  setUserInfo({
                    ...userInfo,
                    userImg: file.response.url,
                  });
                }
              }}
              maxCount={1}
            >
              {/* https://q1.qlogo.cn/g?b=qq&nk=2458015575&s=5，对应着腾讯的头像 */}
              <img
                src={userImg}
                alt="头像"
                style={{ width: "100%", verticalAlign: "center" }}
                className="rounded-full h-full"
              />
            </Upload>
          </div>
          <div className="flex flex-col">
            <Badge
              count={`码龄${registerDays}天`}
              offset={[40, 30]}
              color="#1677ff"
            >
              <p className="text-3xl my-6">{userName}</p>
            </Badge>
            <Space size={40}>
              <span className="text-lg">{desc}</span>
              <span>
                <AlertOutlined />
                &nbsp;粉丝数量：
                <span className="font-bold text-lg">{vermicelliCount}</span>
              </span>
              <span>
                <ContainerOutlined />
                &nbsp;文章数量：
                <span className="font-bold text-lg">{pagesNumber}</span>
              </span>
              {/* <span>
              <CompassOutlined />
              &nbsp;Ip地址：
              <span className="font-bold text-lg">福建</span>
            </span> */}
            </Space>
          </div>
        </header>
        <div className="p-10 text-base">
          <p>qq：{qq}</p>
          <p>学校：{school}</p>
          <p>专业：{profession}</p>
          <p>性别：{sex}</p>
          <Button
            type="primary"
            onClick={() => {
              setIsEdit(true);
              form.setFieldsValue({
                username: userName,
                desc,
              });
            }}
          >
            编辑
          </Button>
        </div>
      </div>
      <Modal
        open={isEdit}
        onCancel={() => setIsEdit(false)}
        title="编辑资料"
        footer={null}
      >
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="用户名"
            name={"username"}
            rules={[{ required: true, message: "非空" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item label="个性签名" name={"desc"}>
            <Input type="text" />
          </Form.Item>
          <Button type="primary">确定</Button>
        </Form>
      </Modal>
    </>
  );
}
