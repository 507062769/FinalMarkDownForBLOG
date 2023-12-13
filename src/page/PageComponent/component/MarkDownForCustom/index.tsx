import React, { useEffect } from "react";
import { animateScroll } from "react-scroll";

// import "@/styles/newsprint.css";
import "./index.less";
import MdPreview from "@/components/MdPreview";
import _ from "lodash";
import ButtonList from "../ButtonList";

export default function MarkDownForCustom(props: {
  data: string;
  pageid: string;
}) {
  useEffect(() => {
    setTimeout(() => {
      const WriteContainer = document.querySelector("#WriteContainer") as any;
      const sliderNav = document.querySelector("#SliderNav") as any;
      const headerTitle = document.querySelectorAll<
        Element & { offsetTop: number }
      >("#write h1,h2,h3,h4,h5,h6");
      console.log(headerTitle.length);
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
        console.log("走这了");

        sliderNav.style.width = "0";
        sliderNav.style.opacity = "0";
        // WriteContainer.style.justifyContent = "center";
        write.style.width = "80%";
      }
      // 由于会执行多次，由于一开始的时候，headerTitle.length === 0，所以会走if，设置了宽度和透明度，但是在最后一次，不会走if，但是此时的width和opacity还是0，所以需要设置回来
      sliderNav.style.width = "33.33333%";
      sliderNav.style.opacity = "1";

      if (sliderNav) {
        console.log("设置页面");

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
      const multiple =
        Number(
          window.getComputedStyle(sliderNav as any)["height"].split("px")[0]
        ) /
        Number(
          window
            .getComputedStyle(WriteContainer as any)
            ["height"].split("px")[0]
        );
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
        sliderNav.scrollTop = smoothValue * multiple;
      });
    }, 100);
  });
  return (
    <>
      <div className=" flex mx-auto relative" id="WriteContainer">
        <div
          id="SliderNav"
          className=" w-4/12 box-border p-4"
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
          className="p-7 w-8/12"
          style={{ backgroundColor: "#f3f2ee" }}
          id="write"
        >
          {/* <ReactMarkdown
            children={props?.data}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[row]}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={oneDark}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          /> */}
          <MdPreview data={props?.data} />
        </div>
        <ButtonList pageid={props.pageid} />
      </div>
    </>
  );
}
