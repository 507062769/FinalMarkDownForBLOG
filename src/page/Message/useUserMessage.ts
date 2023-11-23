import { useState } from "react";

export function useUserMessage() {
  const userMessageList = [
    {
      userId: 1001,
      userName:
        "张三阿达撒大大啊阿达阿阿达阿达的阿达萨德阿达阿萨德啊啊阿达阿达啊",
      lastMessageTime: +new Date(),
      unreadCount: 0,
    },
    {
      userId: 1002,
      userName: "阿达电视",
      lastMessageTime: +new Date(),
      unreadCount: 9,
    },
  ];
  const [currentUserId, setCurrentUserId] = useState(userMessageList[0].userId);
  return {
    currentUserId,
    setCurrentUserId,
    userMessageList,
  };
}
