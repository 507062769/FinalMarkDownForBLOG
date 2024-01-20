import { UserContext } from "@/Context/UserContextProvide";
import { fetchFile, get } from "@/apis";
import {
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  LikeOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Tag,
  Upload,
  message,
} from "antd";
import moment from "moment";
import { useContext, useState, useRef, useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchDeletePage, fetchUpdatePage } from "@/apis/pages";
import { beforeUpload } from "@/page/UserControl/Component/UserInfo";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import MdPreview from "@/components/MdPreview";

export type Page = {
  qq: string;
  pageid: string;
  title: string;
  coverUrl: string;
  description: string;
  createTime: number;
  likeCount: number;
  unlikeCount: number;
  viewCount: number;
  isCheckSuccess: number;
  reason?: string;
};

export default function UserPage({ isCheck = false }: any) {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { mutateAsync } = fetchDeletePage();
  const { mutateAsync: updatePage } = fetchUpdatePage();
  const [cover, setCover] = useState<any>();
  const [form] = useForm();
  const currentPage = useRef<string>();
  const [preview, setPreview] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const { data, refetch } = useQuery<Page[]>(
    [],
    async () => {
      const res = await get("/page/list", {
        qq: userInfo.qq,
      });
      return res.data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const datas = useMemo(() => {
    if (isCheck) {
      return data?.filter((item) => [0, -1].includes(item.isCheckSuccess));
    } else {
      return data?.filter((item) => [1].includes(item.isCheckSuccess));
    }
  }, [data]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <div className="mt-5">
        {datas!?.length > 0 ? (
          datas?.map((item) => (
            <div
              key={item.pageid}
              className="flex flex-row flex-nowrap my-4 pb-1 pages-list"
              style={{ borderBottom: "1px solid #ccc" }}
              onClick={() => {
                if (!isCheck) {
                  navigate(`/page?pageid=${item.pageid}`);
                }
              }}
            >
              <img
                className=""
                src={item.coverUrl}
                alt="文章封面"
                style={{ width: "400px", height: "150px" }}
              />
              <div className="ml-8 flex flex-col flex-grow">
                <p className="text-2xl mt-0 font-bold">{item.title}</p>
                <span className="flex-grow">{item.description}</span>
                <p className="mb-0 flex flex-row justify-around">
                  <span style={{ color: "#1677ff" }}>
                    {moment(Number(item.createTime)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </span>
                  <div className="ml-auto pr-4 text-lg">
                    {isCheck ? (
                      <>
                        {item?.reason && (
                          <>
                            <span style={{ color: "red" }}>
                              未通过原因：{item.reason}
                            </span>
                            <Button type="link" style={{ color: "orange" }}>
                              <Popconfirm
                                title="确定重新发起审核吗？"
                                onConfirm={() => console.log(111)}
                              >
                                <ReloadOutlined />
                                重新审核
                              </Popconfirm>
                            </Button>
                          </>
                        )}
                        <Tag color={item.reason ? "red" : "#1677ff"}>
                          {item.reason ? "未通过" : "审核中"}
                        </Tag>
                      </>
                    ) : (
                      <Space size={"large"}>
                        <span>
                          <EyeOutlined />
                          &nbsp;
                          {item.viewCount}
                        </span>
                        <span>
                          <LikeOutlined />
                          &nbsp;
                          {item.likeCount}
                        </span>
                        <span>
                          <DislikeOutlined />
                          &nbsp;
                          {item.unlikeCount}
                        </span>
                      </Space>
                    )}
                    <Button
                      type="link"
                      className="text-lg"
                      onClick={async (e) => {
                        e.stopPropagation();
                        setIsOpenEditModal(true);
                        const mdContents = await get("page/md", {
                          pageId: item.pageid,
                        });
                        form.setFieldsValue({
                          desc: item.description,
                          title: item.title,
                          content: mdContents.content,
                        });
                        setCover(item.coverUrl);
                        currentPage.current = item.pageid;
                      }}
                    >
                      <EditOutlined />
                      编辑
                    </Button>
                    <Button
                      type="link"
                      danger
                      className="text-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Popconfirm
                        title="删除这篇文章"
                        description="删除之后将无法恢复，请确认?"
                        onConfirm={async () => {
                          const res = await mutateAsync({
                            id: item.pageid,
                            qq: userInfo.qq,
                          });
                          if (res.isShowMessage) {
                            setUserInfo({
                              ...userInfo,
                              pagesNumber: userInfo.pagesNumber - 1,
                            });
                            refetch();
                          }
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <DeleteOutlined />
                        删除
                      </Popconfirm>
                    </Button>
                  </div>
                </p>
              </div>
            </div>
          ))
        ) : (
          <>
            <div>当前暂无{isCheck ? "待发布" : ""}文章，快去发表吧</div>
            <Empty />
          </>
        )}
      </div>
      <Modal
        title="编辑文章"
        open={isOpenEditModal}
        onCancel={() => setIsOpenEditModal(false)}
        okText="确认"
        cancelText="取消"
        width={1000}
        onOk={async () => {
          const res = await updatePage({
            pageid: currentPage.current!,
            title: form.getFieldValue("title"),
            desc: form.getFieldValue("desc"),
            content: form.getFieldValue("content"),
            coverUrl: cover,
            qq: userInfo.qq,
          });
          if (res.isShowMessage) {
            setIsOpenEditModal(false);
            refetch();
          }
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
          labelAlign="left"
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
            label="文章描述"
            name={"desc"}
            rules={[
              { required: true, message: "请输入描述" },
              { min: 10, message: "描述长度不能少于10个字符" },
              { max: 200, message: "描述长度不能超过200个字符" },
            ]}
          >
            <Input
              placeholder="描述"
              addonAfter={
                <ExclamationCircleOutlined
                  onClick={() => message.info("用于在文章列表页展示")}
                />
              }
            />
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
          <Form.Item label="文章内容" name={"content"} required>
            <TextArea rows={30} placeholder="文章内容" />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" onClick={() => setPreview(true)}>
              预览
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="MD效果预览"
        footer={null}
        open={preview}
        onCancel={() => setPreview(false)}
        width={1200}
      >
        <MdPreview data={form.getFieldValue("content")} />
      </Modal>
    </>
  );
}
