import { useMutation } from "react-query";
import { ClientError, post } from ".";

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
