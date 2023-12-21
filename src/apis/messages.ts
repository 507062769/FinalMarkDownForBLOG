import { useMutation } from "react-query";
import { ClientError, post } from ".";

export function getUnreadCount() {
  return useMutation<any, ClientError, { qq: string }>((data) =>
    post("/messages/unreadCount", data)
  );
}
