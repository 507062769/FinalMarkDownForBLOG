import { Message } from "./Message";

class Store {
  message: Message;
  constructor() {
    this.message = new Message();
  }
}

const store = new Store();

export default store;
