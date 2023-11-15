import { Drawer } from "antd";
import CommentTextHeader from "./Component/CommentTextHeader";
import CommentBody from "./Component/CommentBody";

export default function Comment({
  isShowComment,
  setIsShowComment,
}: {
  isShowComment: boolean;
  setIsShowComment: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      <CommentTextHeader />
      <CommentBody />
    </Drawer>
  );
}
