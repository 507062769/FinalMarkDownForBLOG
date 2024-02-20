import { useIndexPage } from "@/hooks/useIndexPage";
import { EyeOutlined, LikeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { Swiper } from "antd-mobile";
import moment from "moment";

export default function MHome() {
  let { home, swipe, slide } = useIndexPage();

  return (
    <>
      <div className="flex flex-row mx-auto" style={{ width: "95%" }}>
        <Space.Compact style={{ width: "100%" }}>
          <Input placeholder="输入关键字" />
          <Button type="primary">
            <SearchOutlined />
          </Button>
        </Space.Compact>
      </div>
      <Space direction="vertical" className="my-2">
        <Swiper
          autoplay
          loop
          indicator={(total, current) => (
            <div
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                background: "rgba(0, 0, 0, 0.3)",
                padding: "4px 8px",
                color: "#ffffff",
                borderRadius: "4px",
                userSelect: "none",
              }}
            >
              {`${current + 1} / ${total}`}
            </div>
          )}
        >
          {swipe.map((item, index) => (
            <Swiper.Item key={index}>
              <img
                src={item.coverUrl}
                alt={item.title}
                width={"100%"}
                height={"200px"}
              />
              <div
                className="m-0 px-4"
                style={{
                  background: "rgba(0,0,0,.3)",
                  color: "white",
                  marginTop: "-8px",
                }}
              >
                {item.title}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </Space>
      <div className="mt-2">
        {home.concat(slide).map((item, index) => (
          <div
            key={item.coverUrl}
            className={`flex flex-row justify-between
            `}
            style={{
              borderBottom: "1px solid #ccc",
              borderTop: `1px solid ${index === 0 ? "#ccc" : "transparent"}`,
            }}
          >
            <img
              style={{
                width: "40%",
                height: "100px",
                transform: "scale(.7)",
                border: "1px solid #ccc",
              }}
              src={item.coverUrl}
              title={item.title}
              alt={item.description}
            />
            <div
              style={{ width: "55%" }}
              className="pr-2 box-border flex flex-col justify-between"
            >
              <h4
                className="mb-1"
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </h4>
              <span className="mb-2 flex flex-row justify-between">
                {moment(Number(item.createTime)).format("YYYY-MM-DD")}
                <Space className="pr-2">
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
                </Space>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
