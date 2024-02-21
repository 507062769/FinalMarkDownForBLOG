import { useEffect } from "react";
import { animateScroll } from "react-scroll";

// import "@/styles/newsprint.css";
import "./index.less";
import MdPreview from "@/components/MdPreview";
import ButtonList from "../ButtonList";

export default function MarkDownForCustom(props: {
  data: string;
  pageid: string;
}) {
  useEffect(() => {
    setTimeout(() => {
      const sliderNav = document.querySelector("#SliderNav") as any;
      const write = document.querySelector("#write") as any;
      const headerTitle = document.querySelectorAll<
        Element & { offsetTop: number }
      >("#write h1,h2,h3,h4,h5,h6");
      let htmlStr = "";
      headerTitle.forEach((item, index) => {
        // console.log(item.tagName, item.id);
        // console.dir(window.getComputedStyle(item), item.computedStyleMap());
        htmlStr += `<p class="${item.tagName}-stylesheet ${
          index === 0 ? "active" : ""
        }" data-pageTop=${item?.offsetTop}>${item.innerHTML}</p>`;
      });

      if (headerTitle.length === 0) {
        // htmlStr = `<p class="H1-stylesheet active" data-pageTop="0">暂无标题</p>`;
        sliderNav.style.width = "0%";
        sliderNav.style.opacity = "0";
        // WriteContainer.style.justifyContent = "center";
        write.style.width = "80%";
      } else {
        sliderNav.style.width = "33.33333%";
        sliderNav.style.opacity = "1";
        write.style.width = "67.6666%";
      }
      console.log(sliderNav.style.width);
      if (sliderNav) {
        sliderNav.innerHTML = htmlStr;
      }
      document.querySelectorAll("p[data-pageTop]").forEach((item) => {
        item.addEventListener("click", () => {
          setTimeout(() => {
            document
              .querySelector("#SliderNav .active")
              ?.classList.remove("active");
            item.classList.add("active");
          }, 600);
        });
      });
      // active 跟随页面滑动
      let smoothValue = 0; //  记录当前page的位置
      let isSmoothBottomDirection = true; //  是否为下滑，默认为下滑
      const snows = document.querySelector(".container-snow")!;
      snows.scrollTop = 0;
      // const multiple =
      //   Number(
      //     window.getComputedStyle(sliderNav as any)["height"].split("px")[0]
      //   ) /
      //   Number(
      //     window
      //       .getComputedStyle(WriteContainer as any)
      //       ["height"].split("px")[0]
      //   );
      // console.log(
      //   window.getComputedStyle(sliderNav as any)["height"].split("px")[0]
      // );

      // console.log(multiple);

      snows.addEventListener("scroll", (e: any) => {
        // 判断滑动的方向
        if (!(e.target.scrollTop > smoothValue)) {
          isSmoothBottomDirection = false;
        } else {
          isSmoothBottomDirection = true;
        }
        // console.log(isSmoothBottomDirection);
        let currentElement = document.querySelector<any>("#SliderNav .active");
        let currentPageY = snows.scrollTop;
        // 如果是向下滑动，则进行切换类操作
        if (
          isSmoothBottomDirection &&
          currentPageY > currentElement?.nextElementSibling?.dataset.pagetop
        ) {
          currentElement?.classList.remove("active");
          currentElement = currentElement?.nextElementSibling;
          currentElement?.classList.add("active");
          // console.log(currentPageY);
          // console.log(currentElement?.nextElementSibling.dataset.pagetop);
        } else if (
          currentPageY < currentElement?.previousElementSibling?.dataset.pagetop
        ) {
          currentElement?.classList.remove("active");
          currentElement = currentElement?.previousElementSibling;
          currentElement?.classList.add("active");
        }
        smoothValue = e.target.scrollTop;
        // nav跟随文章滚动
        // console.log(smoothValue * multiple);
        const active = document.querySelector(".active") as any;
        // console.log(active.offsetTop);
        sliderNav.scrollTop = active.offsetTop;
      });
    }, 100);
  });
  return (
    <>
      <div className=" flex mx-auto relative" id="WriteContainer">
        <div
          id="SliderNav"
          className=" box-border p-4 w-1/3"
          style={{ height: "calc(100vh - 154px)" }}
          onClick={(e: any) => {
            if (!e.target?.dataset?.pagetop) return;
            animateScroll.scrollTo(
              parseFloat(e.target?.dataset?.pagetop) - 70,
              {
                duration: 500,
                containerId: "ContainerSnow",
              }
            );
          }}
        ></div>
        <div
          className="p-7 w-2/3"
          style={{ backgroundColor: "#f3f2ee" }}
          id="write"
        >
          <MdPreview data={props?.data} />
        </div>
        <ButtonList pageid={props.pageid} />
      </div>
    </>
  );
}
