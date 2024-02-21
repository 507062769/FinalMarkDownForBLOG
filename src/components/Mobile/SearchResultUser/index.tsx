import { Empty } from "antd";
import { useNavigate } from "react-router-dom";

export default function MUserList({ data }: { data: any }) {
  const navigate = useNavigate();
  return (
    <>
      {data?.map((item: any) => {
        return (
          // <Link to={`/other?qq=${item.qq}`}>
          <div
            className="flex flex-row bg-white p-2 search-user-list relative"
            style={{ borderBottom: "1px solid #ccc" }}
            onClick={() => {
              navigate(`/mobile/other?qq=${item.qq}&other=${item.userName}`);
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
          </div>
          // </Link>
        );
      })}
      {data.length < 1 && (
        <Empty
          className="bg-white w-full m-0"
          description="啥也没搜到"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </>
  );
}
