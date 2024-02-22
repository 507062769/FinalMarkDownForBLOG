//@ts-nocheck
import ReactMarkdown from "react-markdown"; //引入
import remarkGfm from "remark-gfm";
import row from "rehype-raw";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// 引入md样式文件，仅在当前页面生效
import "@/styles/onedark.css";
import { Image } from "antd";

export default function MdPreview({ data }: any) {
  return (
    <>
      <ReactMarkdown
        children={data}
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
                class={"code-box"}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          img(props) {
            return (
              <Image
                src={props.src}
                fallback="data:image/png;base64,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"
              />
            );
          },
        }}
      />
    </>
  );
}
