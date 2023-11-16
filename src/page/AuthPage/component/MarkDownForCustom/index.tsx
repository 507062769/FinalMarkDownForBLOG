import ReactMarkdown from "react-markdown"; //引入
import remarkGfm from "remark-gfm";
import row from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { animateScroll } from "react-scroll";
// 引入md样式文件，仅在当前页面生效
import "@/styles/onedark.css";
// import "@/styles/newsprint.css";
import "./index.less";

setTimeout(() => {
  window.onload = () => {
    const headerTitle = document.querySelectorAll<
      Element & { offsetTop: number }
    >("h1,h2,h3,h4,h5,h6");
    let htmlStr = "";
    headerTitle.forEach((item, index) => {
      // console.log(item.tagName, item.id);
      // console.dir(window.getComputedStyle(item), item.computedStyleMap());
      htmlStr += `<p class="${item.tagName}-stylesheet ${
        index === 0 ? "active" : ""
      }" data-pageTop=${item?.offsetTop}>${item.innerHTML}</p>`;
    });
    const sliderNav = document.querySelector("#SliderNav");
    if (sliderNav) {
      sliderNav.innerHTML = htmlStr;
    }
    document.querySelectorAll("p[data-pageTop]").forEach((item) => {
      item.addEventListener("click", () => {
        setTimeout(() => {
          console.log(1231312);
          document
            .querySelector("#SliderNav .active")
            ?.classList.remove("active");
          item.classList.add("active");
        }, 100);
      });
    });

    // active 跟随页面滑动
    let smoothValue = 0; //  记录当前page的位置
    let isSmoothBottomDirection = true; //  是否为下滑，默认为下滑

    const snows = document.querySelector(".container-snow")!;
    snows.addEventListener("scroll", (e) => {
      // 判断滑动的方向
      if (!(e.target.scrollTop > smoothValue)) {
        isSmoothBottomDirection = false;
      } else {
        isSmoothBottomDirection = true;
      }

      console.log(isSmoothBottomDirection);
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
    });
  };
}, 100);

export default function MarkDownForCustom(props: { data: string }) {
  return (
    <>
      <div className=" flex mx-auto">
        <div
          id="SliderNav"
          className=" w-4/12 box-border p-4`"
          onClick={(e: any) => {
            if (!e.target?.dataset?.pagetop) return;
            animateScroll.scrollTo(e.target?.dataset?.pagetop, {
              duration: 500,
              containerId: "ContainerSnow",
            });
          }}
        ></div>
        <div
          className="p-7 w-8/12"
          style={{ backgroundColor: "#f3f2ee" }}
          id="write"
        >
          <ReactMarkdown
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
          />
        </div>
      </div>
    </>
  );
}
