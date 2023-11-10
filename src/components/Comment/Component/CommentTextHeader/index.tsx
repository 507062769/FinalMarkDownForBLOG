import react, { useState } from "react";
import imgUser from "@/assets/imgUser.jpg";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function CommentTextHeader() {
  const [commentText, setCommentText] = useState<string>("");

  return (
    <div className="flex flex-row mb-6">
      <img
        src={imgUser}
        alt="用户图片"
        className="w-8 h-8 rounded"
        style={{ verticalAlign: "top" }}
      />
      <TextArea
        className="flex-grow block mx-4"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="发表你的评论"
        autoSize={{ minRows: 3, maxRows: 3 }}
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
