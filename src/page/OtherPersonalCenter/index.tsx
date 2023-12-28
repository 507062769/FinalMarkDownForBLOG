import { UserContext } from "@/Context/UserContextProvide";
import { get } from "@/apis";
import PageList from "@/components/PageList";
import store from "@/stores";
import {
  AlertOutlined,
  CommentOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Badge, Button, Empty, Space, message as messageBox } from "antd";
import moment from "moment";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtherPersonalCenter() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { isLogin, userInfo: userInfos } = useContext(UserContext);
  const qq = params.get("qq");
  const { data } = useQuery(
    ["other-pages-list"],
    async () => {
      const res = await Promise.all([
        get("/page/list", { qq }),
        get("/user/getuserinfo", { qq }),
      ]);
      return { pagesList: res[0]?.data, userInfo: res[1]?.sqlRes };
    },
    { refetchOnWindowFocus: false }
  );
  const userInfo = data?.userInfo;
  const { message } = store;
  const navigate = useNavigate();
  return (
    <div
      style={{ minHeight: "calc(100vh - 186px)" }}
      className="w-11/12 mx-auto bg-white p-4"
    >
      <div className=" w-10/12  mx-auto mt-5 h-full">
        <h2 style={{ borderBottom: "4px solid #ccc" }}>他的资料</h2>
        <header className="flex flex-row justify-start h-44 bg-white">
          <div className="w-52 box-border pt-4">
            <img
              src={userInfo?.userImg}
              alt="头像"
              className="rounded-full w-40 h-40"
            />
          </div>
          <div className="flex flex-col">
            <Badge
              count={`码龄${moment().diff(
                Number(userInfo?.registerDate),
                "days"
              )}天`}
              offset={[40, 30]}
              color="#1677ff"
            >
              <p className="text-3xl my-6">{userInfo?.userName}</p>
            </Badge>
            <Space size={40}>
              <span className="text-lg">{userInfo?.description}</span>
              <span>
                <AlertOutlined />
                &nbsp;粉丝数量：
                <span className="font-bold text-lg">
                  {userInfo?.vermicelliCount}
                </span>
              </span>
              <span>
                <ContainerOutlined />
                &nbsp;文章数量：
                <span className="font-bold text-lg">
                  {userInfo?.pagesNumber}
                </span>
              </span>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isLogin) {
                    messageBox.warning("请先登录");
                    return;
                  }
                  message.addConversation({
                    qq: userInfo.qq,
                    userName: userInfo.userName,
                    lastDate: +new Date(),
                    unreadCount: 0,
                    userImg: userInfo.userImg,
                    isTemporarily: true,
                  });
                  message.messageList = [];
                  message.setCurrentUserId(userInfo.qq, userInfos.qq);
                  navigate("/message");
                }}
                disabled={userInfos?.qq === userInfo?.qq}
              >
                <CommentOutlined />
                私信
              </Button>
              {/* <span>
              <CompassOutlined />
              &nbsp;Ip地址：
              <span className="font-bold text-lg">福建</span>
            </span> */}
            </Space>
          </div>
        </header>
        <div className="p-10 text-base">
          <p>qq：{userInfo?.qq}</p>
          <p>学校：{userInfo?.school}</p>
          <p>专业：{userInfo?.prefession}</p>
          <p>性别：{userInfo?.sex}</p>
        </div>
        <h2 style={{ borderBottom: "4px solid #ccc" }}>他的文章</h2>
        {data?.pagesList.length > 0 ? (
          <PageList data={data?.pagesList} />
        ) : (
          <Empty
            description="小伙伴暂未发布任何文章"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    </div>
  );
}
