import "./index.less";
import { useQuery } from "react-query";
import { get } from "@/apis";
import moment from "moment";
import { GithubOutlined } from "@ant-design/icons";

export default function AuthUserInfo({
  userId = "2458015575",
}: {
  userId?: string;
}) {
  const { data } = useQuery(
    ["userInfo"],
    async () => {
      if (userId === "2458015575") return;
      return (await get("/user/getuserinfo", { qq: userId })) as any;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const { data: countData } = useQuery(["countData"], async () =>
    get<{ visitCount: number; pagesCount: number; userCount: number }>(
      "/page/count"
    )
  );
  return (
    <>
      <div className="box-border ml-5 p-6" id="AuthInfo">
        <img
          src={data?.sqlRes.userImg || "../../assets/userImg.jpg"}
          alt="头像"
          id="AuthImg"
        />
        {userId === "2458015575" ? (
          <div className="text-sm">
            <p>欢迎来到我的博客社区，毕业于武汉某高校的前端</p>
            <p>
              网站访问总量：
              <span style={{ color: "#1677ff" }}>
                {countData?.visitCount || 99}
              </span>
            </p>
            <p>
              网站文章数量：
              <span style={{ color: "#1677ff" }}>
                {countData?.pagesCount || 99}
              </span>
            </p>
            <p>
              网站用户数量：
              <span style={{ color: "#1677ff" }}>
                {countData?.userCount || 99}
              </span>
            </p>
            <p>
              网站运行天数：
              <span style={{ color: "#1677ff" }}>
                {moment().diff("2023-12-31", "day")}
              </span>
            </p>
            <p>
              Github：
              <a href="https://github.com/Yionse" color="#1677ff">
                <GithubOutlined />
              </a>
            </p>
          </div>
        ) : (
          <>
            <p>用户名：{data?.sqlRes.userName}</p>
            <p>
              注册时间：
              {`${moment(data?.sqlRes.createTime).format("YYYY-MM-DD")}`}
            </p>
            <p>粉丝数量：{data?.sqlRes.vermicelliCount}</p>
            <p>文章数量：{data?.sqlRes.pagesNumber}</p>
          </>
        )}
      </div>
    </>
  );
}
