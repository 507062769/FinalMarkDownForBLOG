import "@/page/Home/index.less";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useEffect } from "react";

export default function Swiper({
  list,
}: {
  list: { title: string; url: any; pageId: string }[];
}) {
  useEffect(() => {
    const containerWidth = parseFloat(
      window
        .getComputedStyle(document.querySelector("#SwiperContainer") as any)
        .width.split("px")[0]
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
      const swiperLeft = parseFloat(swiper.style.left.split("px")[0]);
      swiper.style.left = swiperLeft - containerWidth + "px";

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

    document.querySelector(".left-btn")?.addEventListener("click", handleLeft);
    document
      .querySelector(".right-btn")
      ?.addEventListener("click", handleRight);
    let timer = setInterval(() => {
      handleLeft();
    }, 5000);
    // swiper.addEventListener("mouseenter", () => {
    //   console.log(1);
    // });
    return () => {
      document
        .querySelector(".left-btn")
        ?.removeEventListener("click", handleLeft);
      document
        .querySelector(".right-btn")
        ?.removeEventListener("click", handleRight);
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
