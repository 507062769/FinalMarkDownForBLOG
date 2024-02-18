import { AIChat } from "./AiChat";
import { Message } from "./Message";

class Store {
  message: Message;
  aiChat: AIChat;
  constructor() {
    this.message = new Message();
    this.aiChat = new AIChat();
  }
}

const store = new Store();

export default store;
