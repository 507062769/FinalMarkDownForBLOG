import { Drawer, message } from "antd";
import react, { useState, useContext } from "react";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UserContext } from "@/Context/UserContextProvide";
import { fetchAddComment } from "@/apis/pages";
import { useLocation } from "react-router-dom";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from "react-query";
import { get } from "@/apis";
import moment from "moment";
import unlogin from "@/assets/unlogin.jpg";

export default function Comment({
  isShowComment,
  setIsShowComment,
  refetch,
}: {
  isShowComment: boolean;
  setIsShowComment: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageid = params.get("pageid") || "";
  const [commentText, setCommentText] = useState<string>("");
  const { userInfo, isLogin } = useContext(UserContext);
  const { mutateAsync, isLoading } = fetchAddComment();
  const { data, refetch: refetchComment } = useQuery(
    ["comment"],
    async () => (await get("/page/commentlist", { pageid })) as any
  );
  return (
    <Drawer
      open={isShowComment}
      onClose={() => {
        setIsShowComment(false);
      }}
      width={"40%"}
      title="评论区"
      id="comment"
    >
      <div className="flex flex-row mb-6">
        <img
          src={userInfo?.userImg || unlogin}
          alt="用户头像"
          className="w-8 h-8 rounded"
          style={{ verticalAlign: "top" }}
        />
        <TextArea
          className="flex-grow block mx-4"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="发表你的评论"
          autoSize={{ minRows: 3, maxRows: 4 }}
          showCount
          allowClear
          maxLength={100}
        />
        <Button
          type="primary"
          loading={isLoading}
          onClick={async () => {
            if (!isLogin) {
              message.warning("请先登录");
              return;
            }
            if (!commentText) {
              message.warning("评论不能为空");
              return;
            }
            setCommentText("");
            await mutateAsync({
              createTime: +new Date(),
              content: commentText,
              qq: userInfo.qq,
              pageid,
            });
            await refetch();
            await refetchComment();
          }}
        >
          发表
        </Button>
      </div>
      <div id="CommentBody" className="box-border pl-10">
        {data?.data?.map((item) => {
          return (
            <>
              {/* 主评论 */}
              <div className="my-6" key={+new Date()}>
                <div className="w-full flex flex-row">
                  <img
                    src={item.userimg}
                    alt="头像"
                    className="w-8 h-8 rounded flex-shrink-0"
                    style={{ verticalAlign: "text-bottom" }}
                  />
                  <div className="flex flex-row justify-between ml-4 flex-grow overflow-hidden">
                    <p
                      className=" text-lg my-0 w-4/5 overflow-hidden"
                      style={{
                        overflow: "hidden",
                        textOverflow: "clip",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item?.username}
                    </p>
                    <span className="ml-auto flex-shrink-0">
                      {moment(Number(item?.createTime)).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </span>
                  </div>
                </div>
                <p className=" box-border pl-14">{item?.content}</p>
              </div>
              {/* 子评论 */}
              {/* <div className=" box-border pl-14">
              {item.children &&
                item?.children.map((item) => {
                  return (
                    <>
                      <div>
                        <img
                          src={imgUser}
                          alt="头像"
                          className="w-6 h-6 rounded"
                          style={{ verticalAlign: "text-bottom" }}
                        />
                        <span className=" text-lg">{item.usernameOne}</span>
                        {item.usernameTwo && (
                          <>
                            回复
                            <img
                              src={imgUser}
                              alt="头像"
                              className="w-6 h-6 rounded"
                              style={{ verticalAlign: "text-bottom" }}
                            />
                            <span className=" text-lg">{item.usernameTwo}</span>
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
            </div> */}
            </>
          );
        })}
      </div>
    </Drawer>
  );
}
