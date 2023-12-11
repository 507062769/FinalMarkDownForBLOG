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
import {
  ExclamationCircleOutlined,
  FileMarkdownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { fetchFile } from "@/apis";
import { UserContext } from "@/Context/UserContextProvide";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

export default function UploadMd() {
  const [form] = useForm();
  const [cover, setCover] = useState<any>();
  const [md, setMd] = useState<any>();
  const [localImgUrl, setLocalImageUrl] = useState<string[]>();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const newImg = useRef<{ fileName: string; url: string; localImg?: string }[]>(
    []
  );
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

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
        wrapperCol={{ span: 16 }}
        onFinish={async () => {
          /**
           * 点击的时候，此时的状态应当是这样的
           * localImgUrl: 所有的本地完整url，是一个string[]
           * fileList: 所有的映射，在这之
           * 间经过处理，是一个{oldUrl, newUrl}[]，一一对应着本地url和新的url
           * 此时只需要传递给后端一个数组就好了，然后后端读取这个数组的内容，然后在md中进行直接替换
           * 这样形成了一对一的映射
           */
          localImgUrl?.forEach((item) => {
            for (let i = 0; i < newImg.current.length; i++) {
              if (item.includes(newImg.current[i].fileName)) {
                newImg.current[i].localImg = item;
                break;
              }
            }
          });
          const formData = new FormData();
          formData.append("md", md);
          // formData.append("localImgUrl", JSON.stringify(localImgUrl));
          formData.append("fileList", JSON.stringify(newImg.current));
          formData.append("cover", JSON.stringify(cover));
          formData.append("title", JSON.stringify(form.getFieldValue("title")));
          formData.append("desc", JSON.stringify(form.getFieldValue("desc")));
          formData.append("qq", JSON.stringify(userInfo.qq));
          const res = await fetchFile("/md", formData);
          if (res.code === 200) {
            message.success("上传成功");
            navigate("/user");
          } else {
            message.error("上传失败");
          }
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
                  newImg.current.push({
                    fileName: res.fileName,
                    url: "(" + res.url + ")".replace(/\\/g, "/"),
                  });
                  setFileList(
                    fileList.map((item) => {
                      return {
                        ...item,
                        status: "done",
                      };
                    })
                  );
                  /**
                   * 思路，在上传图片的时候，只要选择的是对的图片，那么在后端可以拿到原来的该图片的名称，只不过拿不到，全路径而已
                   * 那么在此时，上传图片完成时，可以进行一个映射，将文件名和新的在线的url进行一个地址映射
                   * 比如原来的图片路径是D:\桌面\新建文件夹\Snipaste_2023-12-01_14-15-33.png，
                   * 那么在后端可以拿到的是Snipaste_2023-12-01_14-15-33.png，另外还可以拿到一个新的在线的url地址
                   * 此时将他们俩作为一个对象放在一起，存入fileList数组，这样就可以在上传完成后，拿到一个一一对应的
                   * 另外在传递时，还有一个完整的路径，可以用于在做新旧图片路径时，做替换操作
                   * 而替换时，并不是按照无无序的数组替换，而是按照fileList数组中的内容进行替换
                   * fileList: [{oldImg: src, newImg: src}]
                   * 那么通过检测当前md中是否存在着localImgUrl，中的元素，如果存在的话，则进行对比，使用循环，否则完成替换
                   * for(file in fileList){       所有需要替换的路径与替换后的路径
                   *    if (md.includes(fileList[file])){     如果路径中还存在着路径，需要进行替换
                   *        // 好像还是无法进行准确替换，因为只能拿到文件名，无法拿到准确的路径，而在md中显示的是完整的路径名
                   *    }
                   * }
                   *
                   * tips：在上传的时候，由于使用了自定义上传，好像能拿到完整的路径，这个时候将路径带入后端，再随后端返回
                   *       虽然有点笨，但好像能实现，另外的情况，这种情况需要确保上传的就是本地的图片
                   *
                   * tips: 好像有办法了，在能拿到文件名的情况下，进行一个匹配即可，因为在上传md的时候，其实可以拿到所有的本地url
                   *       那么在拿到了本地url后，再对fileList进行遍历，通过判断本地url中是否包含fileList中的oldImg，这样就可以进行判
                   *       断，是否是同一张图片，如果是同一张图片的话，则可以拿到新的url地址，那么此时，完整的本地地址有了，与其对应的
                   *       新的url地址也有了，此时在后端中，就可以进行一一对应了，虽然步骤繁琐了一点，但却可以实现
                   *
                   * 伪代码：
                   *       前置：点击上传时，做数据整理，fileList是存放着上传的本地文件名，和对应着的完整地址
                   *       localImg存放着所有的本地地址，而且是完整的
                   *       for(localimg in localImggs) {   遍历所有的本地完整url
                   *          for(file in fileList)    { 遍历当前所有的本地文件名
                   *              if(localimg.includes(file.oldImg)) {
                   *                  说明匹配成功，那么此时file对应的newUrl就是这张本地url对应着的远程url
                   *                  file.oldIMg = localImg      将只有一个文件名的地址替换为完整的url，则此时在后端可
                   *                    以进行完美配对
                   *              }
                   *           }
                   *       }
                   *
                   */
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
