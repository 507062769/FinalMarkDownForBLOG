import "./index.less";
import { useQuery } from "react-query";
import { get } from "@/apis";
import moment from "moment";

export default function AuthUserInfo({
  userId = "2458015575",
}: {
  userId?: string;
}) {
  const { data } = useQuery(
    ["userInfo"],
    async () => (await get("/user/getuserinfo", { qq: userId })) as any,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);
  return (
    <>
      <div className="box-border ml-5 p-6" id="AuthInfo">
        <img src={data?.sqlRes.userImg} alt="头像" id="AuthImg" />
        {userId === "2458015575" ? (
          <>
            <p>介绍</p>
          </>
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
