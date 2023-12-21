import { makeAutoObservable } from "mobx";

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
      qq: "admin",
      userName: "通知",
      lastDate: 1009509685000,
      unreadCount: 0,
      userImg: "http://localhost:9876/systemImgs/unlogin.jpg",
    },
    // {
    //   qq: "2458015575",
    //   userName: "张三",
    //   lastDate: 1009509685000,
    //   unreadCount: 0,
    //   userImg: "http://localhost:9876/systemImgs/unlogin.jpg",
    // },
  ];

  messageList: MessageType[] = [
    // {
    //   qq: "2458015575",
    //   messageList: [
    //     {
    //       from: "2458015575",
    //       messageContent: "你好",
    //       lastDate: "1702542628735",
    //     },
    //     {
    //       from: "3225593545",
    //       messageContent: "你也好",
    //       lastDate: "1702542628735",
    //     },
    //   ],
    // },
  ];
  currentChatUser: ContactType = {
    qq: "系统",
    userName: "系统",
    lastDate: 1009509685000,
    unreadCount: 0,
    userImg: "http://localhost:9876/systemImgs/unlogin.jpg",
  };

  unreadAllCount = this.contactPerson.reduce(
    (pre, cur) => pre + cur.unreadCount,
    0
  );

  constructor() {
    makeAutoObservable(this);
  }

  // 添加联系人
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

  // 切换当前活动的联系人
  setCurrentUserId(userId: string) {
    // this.currentUserId = userId;
    this.currentChatUser = this.contactPerson.find(
      (item) => item.qq === userId
    )!;
    this.contactPerson.forEach((item) => {
      if (item.qq === userId) {
        this.unreadAllCount -= item.unreadCount;
        item.unreadCount = 0;
      }
    });
  }

  // 获取当前联系人的消息列表
  getCurrentUserMessageList() {
    return this.messageList.find((item) => item.qq === this.currentChatUser.qq)
      ?.messageList;
  }

  // 发送一条消息
  addNewMessage(msg: string, from: string) {
    this.messageList
      .find((item) => item.qq === this.currentChatUser.qq)
      ?.messageList.push({
        from,
        messageContent: msg,
        lastDate: new Date().getTime().toString(),
      });
  }
}
