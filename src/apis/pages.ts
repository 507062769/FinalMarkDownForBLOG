import { useMutation } from "react-query";
import { ClientError, post } from ".";

export function fetchDeletePage() {
  return useMutation<any, ClientError, { id: string }>((data) =>
    post("/pages/delete", data)
  );
}
