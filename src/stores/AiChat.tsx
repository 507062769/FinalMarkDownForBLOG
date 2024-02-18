import { makeAutoObservable } from "mobx";

export interface ChatContent {
  role: "user" | "assistant";
  content: string;
}

type ChatListType = {
  key: number;
  content: ChatContent[];
}[];

export class AIChat {
  private chatList: ChatListType = [];

  private currentContext: number = this.chatList[0]?.key || -9999;

  constructor() {
    makeAutoObservable(this);
  }

  addMessage({
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
    localStorage.setItem("Z_BLOG_AICHAT_LIST", JSON.stringify(this.chatList));
  }

  newChat(key: number, content: string) {
    this.chatList.push({
      key,
      content: [{ role: "user", content }],
    });
    this.setCurrentContext(key);
    localStorage.setItem("Z_BLOG_AICHAT_LIST", JSON.stringify(this.chatList));
  }

  setCurrentContext(context: number) {
    this.currentContext = context;
  }

  get getChatList() {
    return this.chatList || [];
  }

  get getCurrentContext() {
    return this.currentContext;
  }

  get getCurrentContent() {
    return (
      this.chatList.find((item) => this.currentContext === item.key)?.content ||
      []
    );
  }

  init() {
    this.chatList =
      JSON.parse(localStorage.getItem("Z_BLOG_AICHAT_LIST") as string) || [];
    this.setCurrentContext(this.chatList?.[0]?.key || -9999);
  }
}
