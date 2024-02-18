import { makeAutoObservable } from "mobx";

interface ChatContent {
  role: "user" | "assistant";
  content: string;
}

type ChatListType = {
  key: number;
  content: ChatContent[];
}[];

export class AIChat {
  private chatList: ChatListType = [
    {
      key: 123,
      content: [
        {
          role: "user",
          content: "你好",
        },
        {
          role: "assistant",
          content: "你也好",
        },
      ],
    },
  ];

  private currentContext: number = 123;

  constructor() {
    makeAutoObservable(this);
  }

  set addMessage({
    key,
    content,
    role,
  }: {
    key: number;
    content: string;
    role: "user" | "assistant";
  }) {
    this.chatList
      .find((item) => item.key === key)
      ?.content.push({ role, content });
  }

  setCurrentContext(context: number) {
    this.currentContext = context;
  }

  get getChatList() {
    return this.chatList;
  }

  get getCurrentContext() {
    return this.currentContext;
  }

  get getCurrentContent() {
    return this.chatList.find((item) => this.currentContext === item.key);
  }
}
