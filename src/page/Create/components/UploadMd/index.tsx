import {
  Button,
  Collapse,
  Form,
  Input,
  List,
  Modal,
  Space,
  Typography,
  Upload,
  message,
} from "antd";
import { useContext, useRef, useState } from "react";
import { beforeUpload } from "@/page/UserControl/Component/UserInfo";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { FileMarkdownOutlined, PlusOutlined } from "@ant-design/icons";
import { fetchFile } from "@/apis";
import { UserContext } from "@/Context/UserContextProvide";
import { useForm } from "antd/es/form/Form";

export default function UploadMd() {
  const [form] = useForm();
  const [cover, setCover] = useState<any>();
  const [md, setMd] = useState<any>();
  const [localImgUrl, setLocalImageUrl] = useState<string[]>();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const newImg = useRef<string[]>([]);
  const { userInfo } = useContext(UserContext);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUploadMd = (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = (e) => {
      // 读取文件
      const mdText = e.target?.result;
      setLocalImageUrl(() => Array.from(getUrlInMd(mdText)) as any);
    };
    const isLt = file.size / 1024 / 1024 < 4;
    if (!isLt) {
      message.error("大小限制为4M");
    }
    return false;
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const getUrlInMd = (testStr: any) => {
    // 要获取到testStr中的所有本地url
    const regex = /\((?:[a-zA-Z]:\\[^:]+?\.png)\)/g;
    const matches = testStr.match(regex);
    return new Set(matches);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChanges: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        onFinish={async () => {
          const formData = new FormData();
          formData.append("md", md);
          formData.append("localImgUrl", JSON.stringify(localImgUrl));
          formData.append("fileList", JSON.stringify(newImg.current));
          formData.append("cover", JSON.stringify(cover));
          formData.append("title", JSON.stringify(form.getFieldValue("title")));
          formData.append("qq", JSON.stringify(userInfo.qq));
          await fetchFile("/md", formData);
        }}
      >
        <Form.Item
          label="标题"
          name={"title"}
          rules={[{ required: true, message: "请输入标题" }]}
          wrapperCol={{ span: 8 }}
        >
          <Input placeholder="文章标题" />
        </Form.Item>
        <Form.Item
          label="封面"
          name={"cover"}
          rules={[{ required: true, message: "请上传封面" }]}
        >
          <Upload
            accept=".jpg,.png,.jpeg"
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader overflow-hidden "
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={async ({ file }) => {
              const formData = new FormData();
              formData.append("avatar", file);
              const res = await fetchFile("/upload", formData);
              setCover(res.url);
            }}
            maxCount={1}
            onChange={async ({ file }: any) => {
              if (file?.response) {
                setCover(file.response.url);
              }
            }}
          >
            {cover ? (
              <img src={cover} alt="cover" width={"700px"} height={"400px"} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="md文档"
          name={"md"}
          rules={[{ required: true, message: "请上传md文档" }]}
        >
          <Upload
            accept=".md"
            name="md"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:33450/md"
            beforeUpload={beforeUploadMd}
            customRequest={() => {}}
            onChange={({ file }) => {
              setMd(file);
            }}
          >
            {md?.name ? (
              <div>
                <FileMarkdownOutlined />
                {md?.name}
              </div>
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        {localImgUrl!?.length > 0 && (
          <Form.Item label=" " colon={false} wrapperCol={{ span: 16 }}>
            <Space className="flex flex-col items-start">
              <Typography.Text type="danger">
                当前存在{localImgUrl?.length}
                张图片，请先将如下图片上传，否则会导致图片无法显示
              </Typography.Text>
              <Collapse
                items={[
                  {
                    key: "1",
                    label: "图片列表",
                    children: (
                      <List
                        dataSource={localImgUrl}
                        renderItem={(item: any) => (
                          <List.Item>
                            <Typography.Text type="danger">
                              [URL]
                            </Typography.Text>{" "}
                            {item}
                          </List.Item>
                        )}
                      />
                    ),
                  },
                ]}
              />
              <Upload
                accept=".jpg,.png,.jpeg"
                name="imgsformd"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChanges}
                multiple
                maxCount={localImgUrl?.length}
                customRequest={async ({ file }) => {
                  const formData = new FormData();
                  formData.append("imgsformd", file);
                  const res = await fetchFile("/imgInMd", formData);
                  setFileList(
                    fileList.map((item) => {
                      return {
                        ...item,
                        status: "done",
                      };
                    })
                  );
                  newImg.current.push("(" + res.url + ")".replace(/\\/g, "/"));
                }}
              >
                {fileList.length >= localImgUrl!?.length ? null : uploadButton}
              </Upload>
            </Space>
          </Form.Item>
        )}
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            上传
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => {
          setPreviewOpen(false);
        }}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}
