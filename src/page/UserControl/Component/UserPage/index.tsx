import { UserContext } from "@/Context/UserContextProvide";
import { get } from "@/apis";
import {
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  EyeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";
import moment from "moment";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchDeletePage } from "@/apis/pages";

export type Page = {
  qq: string;
  pageid: string;
  title: string;
  coverUrl: string;
  desc: string;
  createTime: number;
  likeCount: number;
  unlikeCount: number;
  viewCount: number;
};

export default function UserPage() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const { mutateAsync } = fetchDeletePage();
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
  return (
    <>
      <div className="mt-5">
        {data!.length > 0 ? (
          data?.map((item) => (
            <div
              className="flex flex-row flex-nowrap my-4 pb-1 pages-list"
              style={{ borderBottom: "1px solid #ccc" }}
              onClick={() => {
                navigate(`/page?pageid=${item.pageid}`);
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
                <span className="flex-grow">{item.desc}</span>
                <p className="mb-0 flex flex-row justify-around">
                  <span style={{ color: "#1677ff" }}>
                    {moment(Number(item.createTime)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </span>
                  <div className="ml-auto pr-4 text-lg">
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
                    <Button
                      type="link"
                      className="text-lg"
                      onClick={(e) => {
                        e.stopPropagation();
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
                          });
                          if (res.isShowMessage) {
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
          <div>当前暂无文章，快去发表吧</div>
        )}
      </div>
    </>
  );
}
