import th from "@/assets/th.jpg";
import classNames from "classnames";
import "./index.less";
import { DislikeOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import { Space } from "antd";

export default function PageList({
  data,
  userId = 999,
}: {
  data: {
    qq: string;
    pageid: string;
    title: string;
    coverUrl: string;
    createTime: string;
    likeCount: number;
    unlikeCount: number;
    description: string;
    viewCount: number;
  }[];
  userId?: number;
}) {
  return (
    <>
      <div className="my-4">
        <ul className="list-none p-0">
          {data?.map((item, index) => (
            <Link to={`page?pageid=${item.pageid}`}>
              <li
                key={item.pageid}
                className={`list-page my-8 h-64 flex justify-between bg-white p-4 ${classNames(
                  {
                    "flex-row-reverse": index % 2 !== 0,
                  }
                )}`}
                style={{
                  borderBottom: "4px solid #4096ff",
                }}
              >
                <img src={item.coverUrl} className="w-2/5 rounded-2xl" />
                <div className="h-full flex flex-col" style={{ width: "58%" }}>
                  <h2
                    style={{
                      height: "18%",
                      boxSizing: "border-box",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      borderLeft: "10px solid #f3f2ee",
                      paddingLeft: "10px",
                      boxShadow: "rgba(0,0,0,0.5) 0px 10px 21px -12px",
                      borderRadius: "20px 0 0 20px",
                      margin: "0",
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    style={{
                      height: "55%",
                      overflow: "hidden",
                      textIndent: "2rem",
                    }}
                  >
                    {item.description}
                  </p>
                  <p className="flex justify-between">
                    <span>
                      {moment(Number(item.createTime)).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </span>
                    <Space>
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
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
