import ReactMarkdown from "react-markdown"; //引入
import remarkGfm from "remark-gfm";
import row from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeSlug from "rehype-slug";
// 引入md样式文件，仅在当前页面生效
import "../../styles/onedark.css";
// import "../../styles/newsprint.css";
import "./index.less";
window.onload = () => {
  const headerTitle = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
  let htmlStr = "";
  headerTitle.forEach((item) => {
    // console.log(item.tagName, item.id);
    console.dir(window.getComputedStyle(item));
    htmlStr += `<p class="${item.tagName}-stylesheet"><a href="#${item.id}">${item.id}</a></p>`;
  });
  const sliderNav = document.querySelector("#SliderNav");
  if (sliderNav) {
    sliderNav.innerHTML = htmlStr;
  }
};

export default function MarkDownForCustom(props: { data: string }) {
  return (
    <>
      <div className=" w-11/12 flex mx-auto">
        <div id="SliderNav" className=" w-2/12 box-border p-4`"></div>
        <div
          className="p-7 w-7/12"
          style={{ backgroundColor: "#f3f2ee" }}
          id="write"
        >
          <ReactMarkdown
            children={props?.data}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[row, rehypeSlug]}
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
