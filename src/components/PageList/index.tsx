import th from "@/assets/th.jpg";
import classNames from "classnames";
import "./index.less";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function PageList({ userId = 999 }: { userId?: number }) {
  return (
    <>
      <div className="my-4">
        <ul className="list-none p-0">
          {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
            <Link to={`page?pageid=32255935451701950178205`}>
              <li
                key={item}
                className={`list-page my-8 h-64 flex justify-between bg-white p-4 ${classNames(
                  {
                    "flex-row-reverse": index % 2 !== 0,
                  }
                )}`}
                style={{
                  borderBottom: "4px solid #4096ff",
                }}
              >
                <img src={th} className="w-2/5 rounded-2xl" />
                <div className="h-full flex flex-col" style={{ width: "58%" }}>
                  <h2
                    style={{
                      height: "18%",
                      boxSizing: "border-box",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      borderLeft: "10px solid #f3f2ee",
                      paddingLeft: "10px",
                      boxShadow: "rgba(0,0,0,0.5) 0px 10px 21px -12px",
                      borderRadius: "20px 0 0 20px",
                      margin: "0",
                    }}
                  >
                    这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题
                  </h2>
                  <p
                    style={{
                      height: "55%",
                      overflow: "hidden",
                      textIndent: "2rem",
                    }}
                  >
                    阿萨德阿斯顿撒阿达啊阿萨德啊大大阿达是
                  </p>
                  <p className="flex justify-between">
                    <span>2023-12-12</span>
                    <span>
                      <EyeOutlined />
                      10
                    </span>
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
