import { makeAutoObservable } from "mobx";

export type ContactType = {
  qq: string;
  userName: string;
  lastDate: number;
  unreadCount: number;
  userImg: string;
  isTemporarily?: boolean;
};

type MessageType = {
  from: string;
  messageContent: string;
  lastDate: string;
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
  ];

  messageList: MessageType[] = [];

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

  addNewMessage(msg: string, from: string, lastDate: string) {
    this?.messageList.push({
      from,
      messageContent: msg,
      lastDate,
    });
  }

  // 更新总的未读条数
  updateUnreadAllCount() {
    this.unreadAllCount = this.contactPerson.reduce(
      (pre, cur) => pre + cur.unreadCount,
      0
    );
    // 重新计算顺序
    const [admin, ...lastItem] = this.contactPerson;
    this.contactPerson = [
      admin,
      ...lastItem.sort((a, b) => Number(b.lastDate) - Number(a.lastDate)),
    ];
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
        this.contactPerson.find(
          (item) => item.qq === this.currentChatUser.qq
        )!.lastDate = Number(
          this.messageList[this.messageList.length - 1].lastDate
        );
      }
    });
  }

  // 当发送消息，切换会话都可能会造成排序更改
  updateMessageListSort() {
    this.contactPerson = this.contactPerson.slice().sort((a, b) => {
      // 如果 a 是 "admin"，则 a 在 b 前面
      if (a.qq === "admin") {
        return -1;
      }
      // 如果 b 是 "admin"，则 b 在 a 前面
      if (b.qq === "admin") {
        return 1;
      }
      // 如果 unreadCount 不为 0，则 a 在 b 前面
      if (a.unreadCount !== 0 && b.unreadCount === 0) {
        return -1;
      }
      // 如果 unreadCount 为 0，则 b 在 a 前面
      if (a.unreadCount === 0 && b.unreadCount !== 0) {
        return 1;
      }
      // 如果 unreadCount 相同，按照 lastDate 排序
      return b.lastDate - a.lastDate;
    });
  }
}
