import { useMutation } from "react-query";
import { post } from "./index";

export function testFn() {
  return post("/test/md");
}

export function testRegister() {
  return useMutation<any, any, any>((data) => post("/user/testr", data));
}
export function testLogin() {
  return useMutation<any, any, any>((data) => post("/user/testl", data));
}
