import PageList from "@/components/PageList";
import { Empty } from "antd";

export default function SearchPage(props: { data: any }) {
  return (
    <>
      {props.data?.length > 0 ? (
        <PageList data={props.data} />
      ) : (
        <Empty
          className="bg-white w-full m-0"
          description="啥也没搜到"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </>
  );
}
