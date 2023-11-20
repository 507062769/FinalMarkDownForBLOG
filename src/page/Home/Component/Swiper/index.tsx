import "@/page/Home/index.less";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useEffect } from "react";

document.addEventListener("DOMContentLoaded", () => {
  // swiper.addEventListener("mouseenter", () => {
  //   console.log(1);
  // });
});

export default function Swiper({
  list,
}: {
  list: { title: string; url: any; pageId: string }[];
}) {
  let timer: any = null;

  useEffect(() => {
    const swiperContainer = document.querySelector("#SwiperContainer") as any;
    const containerWidth = parseFloat(
      window.getComputedStyle(swiperContainer).width.split("px")[0]
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

      const swiperLeft = parseFloat(swiper.style.left.split("px")[0]);
      swiper.style.left = swiperLeft - containerWidth + "px";
      console.log(swiper.style.left);
      if (swiper.style.left === "-2917px") {
        swiper.style.left = "0px";
      }
    }, 1000);
    const handleRight = _.throttle(() => {
      const swiperLeft = parseFloat(swiper.style.left.split("px")[0]);
      swiper.style.left = swiperLeft + containerWidth + "px";
      if (swiper.style.left === "729.25px") {
        swiper.style.left = "-2187.75px";
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
  }, []);
  return (
    <>
      <ul id="Swiper">
        {list.map((item) => (
          <li key={item.title} className="float-left swiper-item">
            <img src={item.url} alt="图片" />
            <span>{item.title}</span>
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
