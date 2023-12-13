import ReactMarkdown from "react-markdown"; //引入
import remarkGfm from "remark-gfm";
import row from "rehype-raw";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// 引入md样式文件，仅在当前页面生效
import "@/styles/onedark.css";
export default function MdPreview({ data }: any) {
  return (
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
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
