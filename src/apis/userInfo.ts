import { ClientError, post } from "@/apis/index";
import { useMutation } from "react-query";

export type registerParma = {
  qq: string;
  pass: string;
  code: string;
};

export function useFetchRegister() {
  return useMutation<any, ClientError, registerParma>((data) =>
    post("/user/register", data)
  );
}

export function useGetCode() {
  return useMutation<any, ClientError, { qq: string }>((data) =>
    post("/user/code", data)
  );
}

export function useFetchLogin() {
  return useMutation<any, ClientError, { qq: string }>((data) =>
    post("/user/login", data)
  );
}

export function useFetchForget() {
  return useMutation<any, ClientError, registerParma>((data) =>
    post("/user/forget", data)
  );
}
