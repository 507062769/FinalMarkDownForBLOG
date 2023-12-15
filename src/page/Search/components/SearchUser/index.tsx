import { CommentOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import store from "@/stores";

function SearchUser(props: { data: any }) {
  const { message } = store;
  const navigate = useNavigate();
  return (
    <>
      {props?.data?.map((item) => {
        return (
          // <Link to={`/other?qq=${item.qq}`}>
          <div
            className="flex flex-row bg-white p-2 search-user-list relative"
            style={{ borderBottom: "1px solid #ccc" }}
            onClick={() => {
              navigate(`/other?qq=${item.qq}`);
            }}
          >
            <img
              src={item.userImg}
              className="rounded-full w-16 h-16 flex-shrink-0"
            />
            <div className="ml-4">
              <p className="mt-0 text-base">{item.userName}</p>
              <span className="text-sm">{item.description}</span>
            </div>
            <Button
              className="absolute top-1/2"
              style={{ right: "20px", transform: "translateY(-50%)" }}
              onClick={(e) => {
                e.stopPropagation();
                message.addConversation({
                  qq: item.qq,
                  userName: item.userName,
                  lastDate: +new Date(),
                  unreadCount: 0,
                  userImg: item.userImg,
                });
                navigate("/message");
              }}
            >
              <CommentOutlined />
              私信
            </Button>
          </div>
          // </Link>
        );
      })}
      {props?.data.length < 1 && (
        <Empty
          className="bg-white w-full m-0"
          description="啥也没搜到"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </>
  );
}

export default observer(SearchUser);
