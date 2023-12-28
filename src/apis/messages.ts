import { useMutation } from "react-query";
import { ClientError, get, post } from ".";

export function getUnreadCount() {
  return useMutation<any, ClientError, { qq: string }>((data) =>
    post("/messages/unreadCount", data)
  );
}

export function fetchSendMessage() {
  return useMutation<
    any,
    ClientError,
    {
      targetQQ: string;
      content: string;
      lastDate: string;
      qq: string;
    }
  >((data) => post("/messages/send", data));
}

export function fetchReadMessage() {
  return useMutation<any, ClientError, { targetQQ: string; fromQQ: string }>(
    (data) => get("/messages/read", data)
  );
}
