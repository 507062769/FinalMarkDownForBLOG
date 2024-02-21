import HOCimgLazy from "@/components/HOCImgLazy";
import "@/page/Home/index.less";
import { Page } from "@/page/UserControl/Component/UserPage";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Swiper({ list }: { list: Page[] }) {
  let timer: any = null;
  const navigate = useNavigate();
  useEffect(() => {
    const swiperContainer = document.querySelector("#SwiperContainer") as any;
    const containerWidth = Math.ceil(
      Number(window.getComputedStyle(swiperContainer).width.split("px")[0])
    );
    const swiperWidth = containerWidth * (list.length + 2);
    const swiper = document.querySelector("#Swiper")! as any;
    swiper.style.width = swiperWidth + "px";
    const swpierItem = swiper.querySelectorAll("li.swiper-item") as [];
    swpierItem.forEach((item) => {
      (item as any).style.width = containerWidth + "px";
    });
    swiper.style.left = "0px";
    const handleLeft = _.throttle(() => {
      // debugger;

      const swiperLeft = Math.ceil(swiper.style.left.split("px")[0]);
      swiper.style.left = swiperLeft - containerWidth + "px";

      if (swiperLeft <= containerWidth * -3) {
        swiper.style.left = "0px";
      }
    }, 1000);
    const handleRight = _.throttle(() => {
      const swiperLeft = Math.ceil(swiper.style.left.split("px")[0]);
      swiper.style.left = swiperLeft + containerWidth + "px";
      if (swiperLeft >= 0) {
        swiper.style.left = containerWidth * -3 + "px";
      }
    }, 1000);

    const leftBtn = document.querySelector(".left-btn") as any;
    leftBtn?.addEventListener("click", handleLeft);
    const rightBtn = document.querySelector(".right-btn") as any;
    rightBtn?.addEventListener("click", handleRight);
    clearInterval(timer);
    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        handleLeft();
      }, 3000);
    };
    startTimer();
    const swiperMouseenter = () => {
      clearInterval(timer);
    };
    swiperContainer.addEventListener("mouseenter", swiperMouseenter);
    swiperContainer.addEventListener("mouseout", startTimer);
    return () => {
      leftBtn.removeEventListener("click", handleLeft);
      rightBtn.removeEventListener("click", handleRight);
      clearInterval(timer);
      swiperContainer.removeEventListener("mouseenter", swiperMouseenter);
      swiperContainer.removeEventListener("mouseout", startTimer);
    };
  }, [list]);
  return (
    <>
      <ul id="Swiper">
        {list.map((item) => (
          <li
            key={item.title}
            className="float-left swiper-item"
            onClick={() =>
              navigate(`/page?pageid=${item.pageid}&page=${item.title}`)
            }
          >
            <HOCimgLazy src={item.coverUrl} alt="图片" />
            <span
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </span>
          </li>
        ))}
      </ul>
      <div className="swiper-btn left-btn">
        <LeftOutlined />
      </div>
      <div className="swiper-btn right-btn">
        <RightOutlined />
      </div>
    </>
  );
}
