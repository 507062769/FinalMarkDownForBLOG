import { UserContext } from "@/Context/UserContextProvide";
import { get } from "@/apis";
import moment from "moment";
import { useContext } from "react";
import { useQuery } from "react-query";

export type Page = {
  qq: string;
  pageid: string;
  title: string;
  coverUrl: string;
  desc: string;
  createTime: number;
  linkCount: number;
  unlikeCount: number;
};

export default function UserPage() {
  const { userInfo } = useContext(UserContext);
  const { data } = useQuery<Page[]>(
    [],
    async () => {
      const res = await get("/page/list", {
        qq: userInfo.qq,
      });
      return res.data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <div className="mt-5">
        {data?.map((item) => (
          <div
            className="flex flex-row flex-nowrap my-4 pb-1"
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <img
              className=""
              src={item.coverUrl}
              alt="文章封面"
              style={{ width: "400px", height: "150px" }}
            />
            <div className="ml-8 flex flex-col">
              <p className="text-2xl mt-0 font-bold">{item.title}</p>
              <span className="flex-grow">{item.desc}</span>
              <p className="mb-0 flex flex-row justify-around">
                <div>
                  {moment(Number(item.createTime)).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </div>
                <div>
                  <span>{item.linkCount}</span>
                  <span>{item.unlikeCount}</span>
                </div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
