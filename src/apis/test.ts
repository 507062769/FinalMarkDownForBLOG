import request from "./index";

export function testFn() {
  return request.post("/test/md");
}
