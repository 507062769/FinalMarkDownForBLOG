import react, { useState, useContext } from "react";
import imgUser from "@/assets/unlogin.jpg";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UserContext } from "@/Context/UserContextProvide";

export default function CommentTextHeader() {
  const [commentText, setCommentText] = useState<string>("");
  const { userInfo } = useContext(UserContext);
  return (
    <div className="flex flex-row mb-6">
      <img
        src={userInfo?.userImg || imgUser}
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
      <Button type="primary" color="#f3f2ee">
        发表
      </Button>
    </div>
  );
}
