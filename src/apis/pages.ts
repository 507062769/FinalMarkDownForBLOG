import { useMutation } from "react-query";
import { ClientError, get, post } from ".";

export function fetchDeletePage() {
  return useMutation<any, ClientError, { id: string; qq: string }>((data) =>
    post("/pages/delete", data)
  );
}

export function fetchUpdatePage() {
  return useMutation<
    any,
    ClientError,
    {
      pageid: string;
      title: string;
      content: string;
      desc: string;
      coverUrl: string;
      qq: string;
    }
  >((data) => post("/pages/update", data));
}

export function fetchAddComment() {
  return useMutation<
    any,
    ClientError,
    { createTime: number; content: string; pageid: string; qq: string }
  >((data) => get("/pages/comment", data));
}

export function fetchOperator() {
  return useMutation<
    any,
    ClientError,
    { pageid: string; type: string; fromQQ: string; targetQQ: string }
  >((data) => get("/page/operator", data));
}
