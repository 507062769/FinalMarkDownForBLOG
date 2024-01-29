import AuthUserInfo from "@/components/AuthUserInfo";
import PageList from "@/components/PageList";
import Swiper from "./Component/Swiper";
import { useQuery } from "react-query";
import { FloatButton } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { Page } from "../UserControl/Component/UserPage";
import { useNavigate } from "react-router-dom";
import { get } from "@/apis";
import Footer from "@/components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const { data } = useQuery(
    ["indexmd"],
    async () => await get<{ data: Page[] }>("/page/indexmd", { platform: 1 }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const indexPage = useMemo(() => {
    const home = data?.data.filter((item) => item.position === "home") || [];
    const slide = data?.data.filter((item) => item.position === "slide") || [];
    const swipe = data?.data.filter((item) => item.position === "swipe") || [];
    console.log(home, slide, swipe);

    return {
      home,
      slide,
      swipe,
    };
  }, [data]);

  return (
    <>
      <div className=" flex w-11/12 mx-auto -z-40">
        <div className="w-10/12 box-border" id="FatherContainer">
          {/* 轮播图 */}
          <div
            className="w-full flex SwiperContainer"
            style={{ boxShadow: "0px 0px 20px 4px rgba(0,0,0,.8)" }}
          >
            <div
              className="swiper w-8/12  relative overflow-hidden"
              id="SwiperContainer"
            >
              <Swiper list={indexPage.swipe} />
            </div>
            <div className="box-border p-5  w-4/12 flex flex-col justify-between ">
              {indexPage.slide.map((item) => (
                <article
                  className="flex flex-col small-page"
                  onClick={() =>
                    navigate(`/page?pageid=${item.pageid}&page=${item.title}`)
                  }
                >
                  <img src={item.coverUrl} className="h-5/6"></img>
                  <div
                    className="h-1/6"
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      borderBottom: "4px solid white",
                    }}
                  >
                    {item.title}
                  </div>
                </article>
              ))}
            </div>
          </div>
          {/* 轮播图end */}
          <PageList data={indexPage?.home} />
        </div>
        <div className="w-2/12">
          <AuthUserInfo />
        </div>
        <FloatButton.BackTop
          icon={<VerticalAlignTopOutlined />}
          visibilityHeight={400}
          target={() => document.querySelector(".container-snow") as any}
          className="icon-button"
          tooltip={<span>回到顶部</span>}
        />
      </div>
      <Footer />
    </>
  );
}
