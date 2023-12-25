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
    // 普通联系人
    from: string;
    messageContent: string;
    lastDate: string;
  }[];
};
type SystemMessageType = {
  notification: string;
  from: string;
  pageId: string;
  fromQQ: string;
  lastDate: string;
};
export class Message {
  // 联系人
  contactPerson: ContactType[] = [
    {
      qq: "admin",
      userName: "通知",
      lastDate: 1009509685000,
      unreadCount: 0,
      userImg: "http://localhost:9876/systemImgs/notification.png",
    },
    {
      qq: "2458015575",
      userName: "张三",
      lastDate: 1009509685000,
      unreadCount: 0,
      userImg: "http://localhost:9876/systemImgs/unlogin.jpg",
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

  systemMessageList: SystemMessageType[] = [];

  currentChatUser: ContactType = {
    qq: "admin",
    userName: "通知",
    lastDate: 1009509685000,
    unreadCount: 0,
    userImg: "http://localhost:9876/systemImgs/unlogin.jpg",
  };

  unreadAllCount = 0;

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

  addNewMessage(msg: string, from: string) {
    this.messageList
      .find((item) => item.qq === this.currentChatUser.qq)
      ?.messageList.push({
        from,
        messageContent: msg,
        lastDate: new Date().getTime().toString(),
      });
  }

  // 更新总的未读条数
  updateUnreadAllCount() {
    this.unreadAllCount = this.contactPerson.reduce(
      (pre, cur) => pre + cur.unreadCount,
      0
    );
  }

  // 更新消息发送的最后时间
  updateMessageLastDate() {
    // 更新消息列表的最后时间
    this.contactPerson.forEach((item) => {
      if (item.qq === "admin") {
        // 更新系统消息的最后时间
        this.contactPerson.find((item) => item.qq === "admin")!.lastDate =
          Number(
            this.systemMessageList[this.systemMessageList.length - 1].lastDate
          );
      } else {
        // 普通用户
        const currentMessageList = this.messageList.find(
          (MsgItem) => item.qq === MsgItem.qq
        )?.messageList!;
        item.lastDate = Number(
          currentMessageList[currentMessageList.length - 1].lastDate
        );
      }
    });
  }
}
