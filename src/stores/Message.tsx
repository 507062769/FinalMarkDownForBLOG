import { makeAutoObservable } from "mobx";
import system from "@/assets/unlogin.jpg";

type ContactType = {
  qq: string;
  userName: string;
  lastDate: number;
  unreadCount: number;
  userImg: string;
};

type MessageType = {
  qq: string;
  messageList: {
    from: string;
    messageContent: string;
    lastDate: string;
  }[];
};
export class Message {
  // 联系人
  contactPerson: ContactType[] = [
    {
      qq: "2458015575",
      userName: "系统",
      lastDate: 1009509685000,
      unreadCount: 10,
      userImg: system,
    },
  ];

  messageList: MessageType[] = [
    {
      qq: "2458015575",
      messageList: [
        {
          from: "2458015575",
          messageContent: "你好",
          lastDate: "1702542628735",
        },
        {
          from: "3225593545",
          messageContent: "你也好",
          lastDate: "1702542628735",
        },
      ],
    },
  ];

  currentUserId = "2458015575";

  unreadAllCount = this.contactPerson.reduce(
    (pre, cur) => pre + cur.unreadCount,
    0
  );

  constructor() {
    makeAutoObservable(this);
  }

  addConversation(data: ContactType) {
    // 判断当前是否已经存在消息列表中
    if (this.contactPerson.findIndex((item) => item.qq === data.qq) > 0) {
      // 将当前用户设置为选中
      this.setCurrentUserId(data.qq);
    } else {
      // 添加到消息列表中
      this.contactPerson.push(data);
      this.setCurrentUserId(data.qq);
    }
  }

  setCurrentUserId(userId: string) {
    this.currentUserId = userId;
    this.contactPerson.forEach((item) => {
      if (item.qq === userId) {
        this.unreadAllCount -= item.unreadCount;
        item.unreadCount = 0;
      }
    });
  }
}
