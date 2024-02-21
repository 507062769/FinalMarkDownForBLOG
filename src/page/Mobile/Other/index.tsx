import { get } from "@/apis";
import SmallPageList from "@/components/Mobile/SmallPage";
import { AlertOutlined, ContainerOutlined } from "@ant-design/icons";
import { Badge, Space, Tabs } from "antd";
import moment from "moment";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

export default function MOther() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const qq = params.get("qq");
  const { data } = useQuery(
    ["other-pages-list"],
    async () => {
      const res = (await Promise.all([
        get("/page/list", { qq }),
        get("/user/getuserinfo", { qq }),
      ])) as any;
      return { pagesList: res[0]?.data, userInfo: res[1]?.sqlRes };
    },
    { refetchOnWindowFocus: false }
  );
  const userInfo = data?.userInfo;
  const list = data?.pagesList || [];
  return (
    <Tabs
      className="px-4"
      items={[
        {
          key: "info",
          label: "个人信息",
          children: (
            <div className="bg-white">
              <header className="flex flex-row h-24 bg-white">
                <Badge
                  count={`码龄${moment().diff(
                    Number(userInfo?.registerDate),
                    "days"
                  )}天`}
                  offset={[5, 20]}
                  color="#1677ff"
                  className="ml-4"
                >
                  <img
                    src={userInfo?.userImg}
                    alt="头像"
                    className="rounded-full w-20 h-20"
                    style={{
                      transform: "scale(.8)",
                    }}
                  />
                </Badge>
                <p className="text-3xl my-6">{userInfo?.userName}</p>
              </header>
              <span className="text-lg ml-4">{userInfo?.description}</span>
              <Space size={40} className="ml-4">
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
                {/* <span>
              <CompassOutlined />
              &nbsp;Ip地址：
              <span className="font-bold text-lg">福建</span>
            </span> */}
              </Space>
              <div className="p-10 pl-4 text-base">
                <p>qq：{userInfo?.qq}</p>
                <p>学校：{userInfo?.school}</p>
                <p>专业：{userInfo?.prefession}</p>
                <p>性别：{userInfo?.sex}</p>
                <p>
                  注册时间：
                  {moment(Number(userInfo?.registerDate)).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </p>
              </div>
            </div>
          ),
        },
        {
          label: `创作中心( ${list?.length || 0} )`,
          key: "pages",
          children: <SmallPageList data={list} />,
        },
      ]}
    />
  );
}
