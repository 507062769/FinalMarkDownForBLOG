import SmallPage from "@/components/Mobile/SmallPage";
import { useIndexPage } from "@/hooks/useIndexPage";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { Swiper } from "antd-mobile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MHome() {
  const [key, setKey] = useState<string>("");
  const navigate = useNavigate();
  let { home, swipe, slide } = useIndexPage();
  return (
    <>
      <div className="flex flex-row mx-auto" style={{ width: "95%" }}>
        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder="输入关键字"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <Button
            type="primary"
            onClick={() => {
              navigate(`search?key=${key}`);
            }}
          >
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
          <SmallPage index={index} item={item} />
        ))}
      </div>
    </>
  );
}
