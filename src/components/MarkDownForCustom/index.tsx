import ReactMarkdown from "react-markdown"; //引入
import remarkGfm from "remark-gfm";
import row from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// 引入md样式文件，仅在当前页面生效
// import "../../styles/onedark.css";
import "../../styles/newsprint.css";

export default function MarkDownForCustom(props: { data: string }) {
  return (
    <div className="p-4 " style={{ backgroundColor: "#f3f2ee" }}>
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
  );
}
